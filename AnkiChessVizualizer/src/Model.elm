module Model exposing (..)

import Array
import Board
import Input exposing (Input)
import Piece
import Position exposing (Position)
import Square exposing (Square)
import State
import Step exposing (Step)
import Types exposing (..)
import UndoList
import ViewContext exposing (ViewContext)


canSelectPiece : Model2 -> Square -> Bool
canSelectPiece m sq =
    Position.pieceOn sq (position m)
        |> Maybe.map (\p -> Piece.color p == Position.sideToMove (position m))
        |> Maybe.withDefault False


clearHistory : Model2 -> Model2
clearHistory m =
    { m | states = UndoList.fresh m.states.present }


clearSelection : Model2 -> Model2
clearSelection m =
    { m | selected = Nothing }


fromInput : Input -> Model2
fromInput input =
    let
        steps =
            Step.fromInput input

        s =
            Array.get 0 steps |> Maybe.withDefault Step.initial

        playerColor =
            s.position |> Position.sideToMove
    in
    { idx = 0
    , layout = Board.none
    , mode = Marking
    , playerColor = playerColor
    , prompt = input.prompt
    , selected = Nothing
    , steps = steps
    , states = UndoList.fresh (State.fromStep s)
    , viewCtx =
        ViewContext.init
            { devicePixelRatio = input.devicePixelRatio
            , envelope = ViewCtxMsg
            }
    }


position : Model2 -> Position
position m =
    step m |> .position


redo : Model2 -> Model2
redo m =
    { m | states = UndoList.redo m.states }


state : Model2 -> State
state m =
    m.states.present


step : Model2 -> Step
step m =
    state m |> .step


fromModel2 : Model2 -> Model
fromModel2 m =
    { arrows = state m |> .arrows
    , board = m.layout
    , idx = m.idx
    , marks = state m |> .marks
    , mode = m.mode
    , playerColor = m.playerColor
    , prompt = m.prompt
    , selected = m.selected
    , step = step m |> Just
    , steps = m.steps
    , viewCtx = m.viewCtx
    }


undo : Model2 -> Model2
undo m =
    { m | states = UndoList.undo m.states }


updateIndex : Model2 -> Int -> Model2
updateIndex m idx_ =
    case Array.get idx_ m.steps of
        Nothing ->
            m

        Just step_ ->
            step_
                |> State.updateStep m.states.present
                |> updateState m
                |> (\m_ -> { m_ | idx = idx_ })


updateSelection : Model2 -> Square -> Bool -> Model2
updateSelection m sq canSelect =
    if canSelect then
        { m | selected = Just sq }

    else
        m


updateState : Model2 -> State -> Model2
updateState m state_ =
    if m.states.present /= state_ then
        { m | states = UndoList.new state_ m.states }

    else
        m


updateViewContext : Model2 -> ViewContext Msg -> Model2
updateViewContext m vc_ =
    vc_
        |> Board.fromViewContext m.layout
        |> (\b_ -> { m | layout = b_, viewCtx = vc_ })
