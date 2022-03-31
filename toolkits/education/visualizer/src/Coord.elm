module Coord exposing (..)


type alias Coord =
    { x : Float
    , y : Float
    }


addX : Coord -> Float -> Coord
addX c dx =
    { c | x = c.x + dx }
