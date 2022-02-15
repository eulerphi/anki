module Update exposing (..)

import Array
import Model
import Move
import Position
import Square exposing (Square)
import State
import Step
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
            ( Model.updateIndex m m.idx, Cmd.none )

        ClickSquare sq ->
            case m.mode of
                Arrowing ->
                    ( clickArrow m sq, Cmd.none )

                Marking ->
                    ( clickMark m sq, Cmd.none )

                Moving ->
                    ( clickMove m sq, Cmd.none )

        FirstMove ->
            Model.updateIndex m 0
                |> (\m_ -> ( m_, Cmd.none ))

        LastMove ->
            Model.updateIndex m (Array.length m.steps - 1)
                |> (\m_ -> ( m_, Cmd.none ))

        NextMove ->
            min (m.idx + 1) (Array.length m.steps - 1)
                |> Model.updateIndex m
                |> (\m_ -> ( m_, Cmd.none ))

        PrevMove ->
            max 0 (m.idx - 1)
                |> Model.updateIndex m
                |> (\m_ -> ( m_, Cmd.none ))

        SetMove idx ->
            idx
                |> Model.updateIndex m
                |> (\m_ -> ( m_, Cmd.none ))

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
