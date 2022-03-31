module Input exposing (Input, decode)

import Json.Decode as D
import Json.Encode as E


type alias Input =
    { seed : Int
    , showAnswer : Bool
    , word : String
    }


decode : E.Value -> Input
decode value =
    case D.decodeValue decoder value of
        Ok input ->
            input

        Err _ ->
            { seed = 0
            , showAnswer = True
            , word = "error"
            }


decoder : D.Decoder Input
decoder =
    D.map3 Input
        (D.field "seed" D.int)
        (D.field "showAnswer" D.bool)
        (D.field "word" D.string)
