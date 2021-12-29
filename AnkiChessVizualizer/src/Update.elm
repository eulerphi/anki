module Update exposing (..)

import Array
import Board
import Dict
import Mark
import Model exposing (..)
import Move
import Notation
import Piece exposing (Piece)
import Position
import Square exposing (Square)
import ViewContext exposing (ViewContext)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg m =
    case msg of
        NoOp ->
            ( m, Cmd.none )

        Clear ->
            ( { m
                | arrows = []
                , marks = Dict.empty
                , selected = Nothing
                , step = Array.get m.idx m.steps
              }
            , Cmd.none
            )

        ClickSquare square ->
            case m.mode of
                Arrowing ->
                    ( clickArrowing m square, Cmd.none )

                Marking ->
                    ( clickMarking m square, Cmd.none )

                Moving ->
                    ( clickMoving m square, Cmd.none )

        NextMove ->
            min (m.idx + 1) (Array.length m.steps - 1)
                |> updateStep m
                |> (\m_ -> ( m_, Cmd.none ))

        PrevMove ->
            max 0 (m.idx - 1)
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
        Nothing ->
            { m | selected = Just square }

        Just sq ->
            if sq == square then
                { m | selected = Nothing }

            else
                let
                    ( haves, havenots ) =
                        m.arrows
                            |> List.partition (\a -> a.src == sq && a.dst == square)

                    arrows_ =
                        if List.length haves > 0 then
                            havenots

                        else
                            Arrow sq square :: m.arrows
                in
                { m | selected = Nothing, arrows = arrows_ }


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


clickMoving : Model -> Square -> Model
clickMoving m square =
    case m.step of
        Nothing ->
            m

        Just step ->
            case m.selected of
                Nothing ->
                    Position.pieceOn square step.position
                        |> Maybe.map (\_ -> { m | selected = Just square })
                        |> Maybe.withDefault m

                Just src ->
                    if Square.toInt src == Square.toInt square then
                        { m | selected = Nothing, prompt = "same" }

                    else
                        Position.movesFrom src step.position
                            |> List.filter (\mv -> Move.to mv == square)
                            |> List.head
                            |> Maybe.map
                                (\mv ->
                                    { move = Nothing
                                    , number = 0
                                    , position = Position.doMove mv step.position
                                    , prevMove = Just { move = mv, san = "" }
                                    }
                                )
                            |> Maybe.map (\s -> { m | selected = Nothing, step = Just s })
                            |> Maybe.withDefault { m | selected = Nothing }


updateStep : Model -> Int -> Model
updateStep m idx_ =
    Array.get idx_ m.steps
        |> (\step_ -> { m | idx = idx_, step = step_ })
        |> (\m_ -> { m_ | arrows = [], marks = Dict.empty })


updateViewContext : Model -> ViewContext Msg -> Model
updateViewContext m vc_ =
    vc_
        |> Board.fromViewContext m.board
        |> (\b_ -> { m | board = b_, viewCtx = vc_ })
