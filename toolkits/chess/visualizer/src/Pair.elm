module Pair exposing (..)


add : ( number, number ) -> ( number, number ) -> ( number, number )
add p1 p2 =
    ( Tuple.first p1 + Tuple.first p2
    , Tuple.second p1 + Tuple.second p2
    )


addFirst : ( number, number ) -> ( number, number ) -> ( number, number )
addFirst p1 p2 =
    ( Tuple.first p1 + Tuple.first p2
    , Tuple.second p1
    )


addSecond : ( number, number ) -> ( number, number ) -> ( number, number )
addSecond p1 p2 =
    ( Tuple.first p1
    , Tuple.second p1 + Tuple.second p2
    )


fork : (a -> b) -> (a -> c) -> a -> ( b, c )
fork fn1 fn2 input =
    ( fn1 input, fn2 input )


map : (a -> b) -> ( a, a ) -> ( b, b )
map fn pair =
    Tuple.mapBoth fn fn pair


uncurry : (a -> b -> c) -> ( a, b ) -> c
uncurry fn ( a, b ) =
    fn a b
