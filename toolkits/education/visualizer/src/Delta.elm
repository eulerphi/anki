module Delta exposing (..)

import MathEx


type alias Delta =
    { dx : Float
    , dy : Float
    }


init : ( Float, Float ) -> Delta
init ( dx, dy ) =
    { dx = dx, dy = dy }


none : Delta
none =
    init ( 0, 0 )


add : Delta -> Delta -> Delta
add d1 d2 =
    { dx = d1.dx + d2.dx
    , dy = d1.dy + d2.dy
    }


addX : Delta -> Delta -> Delta
addX d1 d2 =
    { dx = d1.dx + d2.dx
    , dy = d1.dy
    }


addY : Delta -> Delta -> Delta
addY d1 d2 =
    { dx = d1.dx
    , dy = d1.dy + d2.dy
    }


div : Float -> Delta -> Delta
div unit d =
    { dx = d.dx / unit, dy = d.dy / unit }


map : (Float -> a) -> Delta -> ( a, a )
map fn d =
    ( fn d.dx, fn d.dy )


roundNear : Float -> Delta -> Delta
roundNear unit d =
    { dx = MathEx.roundNear unit d.dx
    , dy = MathEx.roundNear unit d.dy
    }


scale : Float -> Delta -> Delta
scale unit d =
    { dx = unit * d.dx, dy = unit * d.dy }
