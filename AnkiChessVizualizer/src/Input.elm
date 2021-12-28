module Input exposing (Input, decode)

import Json.Decode as D
import Json.Encode as E


type alias Input =
    { devicePixelRatio : Float
    , explanation : String
    , fen : String
    , moves : List String
    , prompt : String
    }


type alias RawInput =
    { devicePixelRatio : Float
    , explanation : String
    , fen : String
    , moves : String
    , prompt : String
    }


decode : E.Value -> Input
decode value =
    case D.decodeValue decoder value of
        Ok input ->
            { devicePixelRatio = input.devicePixelRatio
            , explanation = input.explanation
            , fen = input.fen
            , moves = input.moves |> parseMoves
            , prompt = input.prompt
            }

        Err _ ->
            { devicePixelRatio = 1.0
            , explanation = ""
            , fen = ""
            , moves = []
            , prompt = "<Input-Malformed>"
            }


decoder : D.Decoder RawInput
decoder =
    D.map5 RawInput
        (D.field "devicePixelRatio" D.float)
        (D.field "explanation" D.string)
        (D.field "fen" D.string)
        (D.field "moves" D.string)
        (D.field "prompt" D.string)


parseMoves : String -> List String
parseMoves moves =
    moves |> String.split " "
