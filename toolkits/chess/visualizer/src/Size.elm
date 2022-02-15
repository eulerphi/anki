module Size exposing (..)


type alias Size =
    { width : Float
    , height : Float
    }


type alias Sizelike r number =
    { r
        | width : number
        , height : number
    }


none : Size
none =
    Size 0 0
