module Msg exposing (..)

import Coord exposing (Coord)
import Delta exposing (Delta)
import Draggable


type Msg
    = NoOp
    | DragMsg (Draggable.Msg String)
    | StartDrag String
    | DragMove Delta
    | EndDrag
