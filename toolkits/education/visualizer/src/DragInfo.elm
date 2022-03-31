module DragInfo exposing (..)

import Delta exposing (Delta)


type alias DragInfo =
    { idx : Int
    , x : Float
    , y : Float
    , delta : Delta
    }


empty : DragInfo
empty =
    { idx = -1
    , x = 0
    , y = 0
    , delta = Delta.none
    }


updateDelta : DragInfo -> Delta -> DragInfo
updateDelta info delta =
    { info | delta = Delta.addX info.delta delta }
