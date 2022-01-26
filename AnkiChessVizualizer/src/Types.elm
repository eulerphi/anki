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


type alias LogLine =
    { white : LogItem
    , black : LogItem
    }


type alias LogItem =
    { selected : Bool
    , text : Maybe String
    }


type alias Model2 =
    { answer : String
    , idx : Int
    , layout : Board
    , mode : Mode
    , playerColor : PieceColor
    , prompt : String
    , selected : Maybe Square
    , showAnswer : Bool
    , states : UndoList State
    , steps : Array Step
    , viewCtx : ViewContext Msg
    }


type alias Model =
    { arrows : List Arrow
    , answer : String
    , board : Board
    , idx : Int
    , marks : Dict Int Mark
    , mode : Mode
    , playerColor : PieceColor
    , prompt : String
    , selected : Maybe Square
    , showAnswer : Bool
    , step : Maybe Step
    , steps : Array Step
    , viewCtx : ViewContext Msg
    }


type alias Point =
    { x : Float
    , y : Float
    }


type Msg
    = NoOp
    | Clear
    | Redo
    | Undo
    | FirstMove
    | LastMove
    | NextMove
    | PrevMove
    | ClickSquare Square
    | SelectMode Mode
    | ViewCtxMsg ViewContext.Msg


type Mode
    = Arrowing
    | Marking
    | Moving
