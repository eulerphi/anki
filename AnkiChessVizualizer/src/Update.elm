module Update exposing (..)

import Array
import Board
import Dict
import Mark
import Model exposing (..)
import Square exposing (Square)
import ViewContext exposing (ViewContext)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg m =
    case msg of
        NoOp ->
            ( m, Cmd.none )

        Clear ->
            ( { m | arrows = [], marks = Dict.empty, selected = Nothing }, Cmd.none )

        ClickSquare square ->
            case m.mode of
                Arrowing ->
                    ( clickArrowing m square, Cmd.none )

                Marking ->
                    ( clickMarking m square, Cmd.none )

                Moving ->
                    ( m, Cmd.none )

        NextMove ->
            min (m.current.idx + 1) (Array.length m.steps - 1)
                |> updateStep m
                |> (\m_ -> ( m_, Cmd.none ))

        PrevMove ->
            max 0 (m.current.idx - 1)
                |> updateStep m
                |> (\m_ -> ( m_, Cmd.none ))

        SelectMode mode ->
            ( { m | mode = mode }, Cmd.none )

        ViewCtxMsg subMsg ->
            ViewContext.update subMsg m.viewCtx
                |> (\( vc_, cmd_ ) -> ( vc_ |> updateViewContext m, cmd_ ))


clickArrowing : Model -> Square -> Model
clickArrowing m square =
    case m.selected of
        Just sq ->
            if sq == square then
                { m | selected = Nothing }

            else
                Arrow sq square
                    :: m.arrows
                    |> (\xs -> { m | selected = Nothing, arrows = xs })

        Nothing ->
            { m | selected = Just square }


clickMarking : Model -> Square -> Model
clickMarking m square =
    let
        key =
            Square.toInt square

        val =
            Dict.get key m.marks
                |> Maybe.withDefault NoMark
                |> Mark.next

        marks_ =
            if val /= NoMark then
                Dict.insert key val m.marks

            else
                Dict.remove key m.marks
    in
    { m | marks = marks_ }


updateStep : Model -> Int -> Model
updateStep m idx =
    Array.get idx m.steps
        |> (\step_ -> { m | current = { idx = idx, step = step_ } })
        |> (\m_ -> { m_ | arrows = [], marks = Dict.empty })


updateViewContext : Model -> ViewContext Msg -> Model
updateViewContext m vc_ =
    vc_
        |> Board.fromViewContext m.board
        |> (\b_ -> { m | board = b_, viewCtx = vc_ })
