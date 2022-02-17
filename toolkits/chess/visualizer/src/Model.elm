module Model exposing (..)

import Array
import Board
import Input exposing (Input)
import Piece
import PieceColor exposing (PieceColor)
import Position exposing (Position)
import Square exposing (Square)
import State
import Step exposing (Step)
import StringEx
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


fromError : String -> Model2
fromError error =
    { answer = ""
    , idx = 0
    , layout = Board.none
    , mode = Moving
    , playerColor = PieceColor.white
    , prompt = "**ERROR**: " ++ error
    , selected = Nothing
    , showAnswer = False
    , steps = Array.fromList []
    , states = UndoList.fresh State.empty
    , viewCtx =
        ViewContext.init
            { devicePixelRatio = 1
            , envelope = ViewCtxMsg
            }
    }


fromInput : Input -> Model2
fromInput input =
    let
        steps =
            Step.fromInput input

        idx =
            min (Array.length steps - 1) input.puzzle.startMoveIndex

        s =
            Array.get idx steps
                |> Maybe.withDefault Step.initial
                |> State.fromStep
                |> State.updateArrows
                |> (\fn -> fn (parseArrows input.arrows))

        playerColor =
            s.step.position |> Position.sideToMove
    in
    { answer = StringEx.unencodeNewlines input.answer
    , idx = idx
    , layout = Board.none
    , mode = Moving
    , playerColor = playerColor
    , prompt = StringEx.unencodeNewlines input.prompt
    , selected = Nothing
    , showAnswer = input.showAnswer
    , steps = steps
    , states = UndoList.fresh s
    , viewCtx =
        ViewContext.init
            { devicePixelRatio = input.devicePixelRatio
            , envelope = ViewCtxMsg
            }
    }


parseArrows : String -> List Arrow
parseArrows str =
    str
        |> String.split " "
        |> List.filter (not << String.isEmpty)
        |> List.map (\s -> ( String.left 2 s, String.right 2 s ))
        |> List.filterMap parseArrow


parseArrow : ( String, String ) -> Maybe Arrow
parseArrow ( src, dst ) =
    let
        squares =
            ( Square.fromString src, Square.fromString dst )
    in
    case squares of
        ( Just src_, Just dst_ ) ->
            Just { src = src_, dst = dst_ }

        _ ->
            Nothing


position : Model2 -> Position
position m =
    step m |> .position


redo : Model2 -> Model2
redo m =
    { m | states = UndoList.redo m.states }


startColor : Model -> PieceColor
startColor m =
    Array.get 0 m.steps
        |> Maybe.map (\s -> Position.sideToMove s.position)
        |> Maybe.withDefault PieceColor.white


state : Model2 -> State
state m =
    m.states.present


step : Model2 -> Step
step m =
    state m |> .step


fromModel2 : Model2 -> Model
fromModel2 m =
    { arrows = state m |> .arrows
    , answer = m.answer
    , board = m.layout
    , idx = m.idx
    , marks = state m |> .marks
    , mode = m.mode
    , playerColor = m.playerColor
    , prompt = m.prompt
    , selected = m.selected
    , showAnswer = m.showAnswer
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
                |> State.updateStep (state m)
                |> State.clearAnnotations
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
