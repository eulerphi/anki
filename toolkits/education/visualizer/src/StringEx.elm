module StringEx exposing (pixelLength)


pixelLength : Float -> String
pixelLength length =
    String.fromFloat length ++ "px"
