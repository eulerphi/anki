module Types exposing (..)

import Array exposing (Array)
import Board exposing (Board)
import Dict exposing (Dict)
import PieceColor exposing (PieceColor)
import Square exposing (Square)
import Step exposing (Step)
import UndoList exposing (UndoList)
import ViewContext exposing (ViewContext)


type alias Arrow =
    { src : Square
    , dst : Square
    }


type Mark
    = NoMark
    | Green
    | Red


type alias State =
    { arrows : List Arrow
    , marks : Dict Int Mark
    , step : Step
    }


type alias Model2 =
    { idx : Int
    , layout : Board
    , mode : Mode
    , playerColor : PieceColor
    , prompt : String
    , selected : Maybe Square
    , states : UndoList State
    , steps : Array Step
    , viewCtx : ViewContext Msg
    }


type alias Model =
    { arrows : List Arrow
    , board : Board
    , idx : Int
    , marks : Dict Int Mark
    , mode : Mode
    , playerColor : PieceColor
    , prompt : String
    , selected : Maybe Square
    , step : Maybe Step
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
    | Redo
    | Undo
    | NextMove
    | PrevMove
    | ClickSquare Square
    | SelectMode Mode
    | ViewCtxMsg ViewContext.Msg


type Mode
    = Arrowing
    | Marking
    | Moving
