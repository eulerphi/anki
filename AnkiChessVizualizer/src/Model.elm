module Model exposing (..)

import Array exposing (Array)
import Board exposing (Board)
import Dict exposing (Dict)
import Input exposing (Input)
import PieceColor exposing (PieceColor)
import Position
import Square exposing (Square)
import Step exposing (Step)
import ViewContext exposing (ViewContext)


type alias Arrow =
    { src : Square
    , dst : Square
    }


type Mark
    = NoMark
    | Green
    | Red


type alias Model =
    { arrows : List Arrow
    , board : Board
    , current : { idx : Int, step : Maybe Step }
    , marks : Dict Int Mark
    , mode : Mode
    , playerColor : PieceColor
    , prompt : String
    , selected : Maybe Square
    , steps : Array Step
    , viewCtx : ViewContext Msg
    }


type alias Point =
    { x : Float
    , y : Float
    }


type alias Pos =
    { rank : Int
    , file : Int
    }


type Msg
    = NoOp
    | Clear
    | ClickSquare Square
    | NextMove
    | PrevMove
    | SelectMode Mode
    | ViewCtxMsg ViewContext.Msg


type Mode
    = Arrowing
    | Marking
    | Moving


fromInput : Input -> Model
fromInput input =
    let
        steps =
            Step.fromInput input

        current =
            { idx = 0, step = Array.get 0 steps }

        playerColor =
            current.step
                |> Maybe.map .position
                |> Maybe.map Position.sideToMove
                |> Maybe.withDefault PieceColor.white
    in
    { arrows = []
    , board = Board.none
    , current = current
    , marks = Dict.empty
    , mode = Marking
    , playerColor = playerColor
    , prompt = input.prompt
    , selected = Nothing
    , steps = steps
    , viewCtx =
        ViewContext.init
            { devicePixelRatio = input.devicePixelRatio
            , envelope = ViewCtxMsg
            }
    }
