module StringEx exposing (..)


pixelLength : Float -> String
pixelLength length =
    String.fromFloat length ++ "px"


unencodeNewlines : String -> String
unencodeNewlines str =
    str
        |> String.replace "\\n" "\n"
        |> String.replace "<br>" "\n"
