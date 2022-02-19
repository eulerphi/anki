module Update exposing (..)

import Array
import Browser.Dom
import Log
import Model
import Move
import Position
import Square exposing (Square)
import State
import Step
import Task
import Types exposing (..)
import ViewContext


update : Msg -> Model2 -> ( Model2, Cmd Msg )
update msg m =
    case msg of
        NoOp ->
            ( m, Cmd.none )

        Redo ->
            ( Model.redo m, Cmd.none )

        Undo ->
            ( Model.undo m, Cmd.none )

        Clear ->
            updateIndex m m.idx

        ClickSquare sq ->
            case m.mode of
                Arrowing ->
                    ( clickArrow m sq, Cmd.none )

                Marking ->
                    ( clickMark m sq, Cmd.none )

                Moving ->
                    ( clickMove m sq, Cmd.none )

        FirstMove ->
            updateIndex m 0

        LastMove ->
            updateIndex m (Array.length m.steps - 1)

        NextMove ->
            min (m.idx + 1) (Array.length m.steps - 1)
                |> updateIndex m

        PrevMove ->
            max 0 (m.idx - 1)
                |> updateIndex m

        SetMove idx ->
            updateIndex m idx

        SelectMode mode ->
            ( { m | mode = mode }, Cmd.none )

        ViewCtxMsg subMsg ->
            ViewContext.update subMsg m.viewCtx
                |> Tuple.mapFirst (Model.updateViewContext m)


clickArrow : Model2 -> Square -> Model2
clickArrow m sq =
    case m.selected of
        Nothing ->
            Model.updateSelection m sq True

        Just src ->
            if sq == src then
                Model.clearSelection m

            else
                Arrow src sq
                    |> State.updateArrow (Model.state m)
                    |> Model.updateState m
                    |> Model.clearSelection


clickMark : Model2 -> Square -> Model2
clickMark m sq =
    State.updateMark (Model.state m) sq
        |> Model.updateState m


clickMove : Model2 -> Square -> Model2
clickMove m sq =
    case m.selected of
        Nothing ->
            Model.canSelectPiece m sq
                |> Model.updateSelection m sq

        Just src ->
            if src == sq then
                Model.clearSelection m

            else
                Position.movesFrom src (Model.position m)
                    |> List.filter (\mv -> Move.to mv == sq)
                    -- TODO : handle picking pawn promotion move
                    |> List.head
                    |> Maybe.map (Model.step m |> Step.doMove)
                    |> Maybe.map (Model.state m |> State.updateStep)
                    |> Maybe.withDefault (Model.state m)
                    |> Model.updateState m
                    |> Model.clearSelection


scrollLogItemIntoView : Int -> Cmd Msg
scrollLogItemIntoView itemIdx =
    Task.map3
        (\item log viewport ->
            let
                topDiff =
                    item.element.y - log.element.y

                botDiff =
                    topDiff + item.element.height - log.element.height

                scrollY =
                    viewport.viewport.y
            in
            if topDiff < 0 then
                max 0 (scrollY + topDiff)
                    |> Just

            else if botDiff > 0 then
                Just (scrollY + botDiff)

            else
                Nothing
        )
        (Browser.Dom.getElement (Log.itemElementId itemIdx))
        (Browser.Dom.getElement Log.logElementId)
        (Browser.Dom.getViewportOf Log.logElementId)
        |> Task.andThen
            (\val ->
                case val of
                    Just v ->
                        Browser.Dom.setViewportOf "movelog" 0 v

                    Nothing ->
                        Browser.Dom.setViewportOf "DNE" 0 0
            )
        |> Task.attempt (\_ -> NoOp)


updateIndex : Model2 -> Int -> ( Model2, Cmd Msg )
updateIndex m idx =
    let
        m_ =
            Model.updateIndex m idx
    in
    ( m_, scrollLogItemIntoView m_.idx )
