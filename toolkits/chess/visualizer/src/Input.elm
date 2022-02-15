module Input exposing (Input, decode)

import Json.Decode as D
import Json.Encode as E


type alias Input =
    { answer : String
    , arrows : String
    , devicePixelRatio : Float
    , fen : String
    , moves : List String
    , prevMoves : List String
    , prompt : String
    , showAnswer : Bool
    }


type alias RawInput =
    { answer : String
    , arrows : String
    , devicePixelRatio : Float
    , fen : String
    , moves : String
    , prevMoves : String
    , prompt : String
    , showAnswer : Bool
    }


decode : E.Value -> Input
decode value =
    case D.decodeValue decoder value of
        Ok input ->
            { answer = unencode input.answer
            , arrows = input.arrows
            , devicePixelRatio = input.devicePixelRatio
            , fen = input.fen
            , moves = input.moves |> parseMoves
            , prevMoves = input.prevMoves |> parseMoves
            , prompt = unencode input.prompt
            , showAnswer = input.showAnswer
            }

        Err _ ->
            { answer = ""
            , arrows = ""
            , devicePixelRatio = 1.0
            , fen = ""
            , moves = []
            , prevMoves = []
            , prompt = "<Input-Malformed>"
            , showAnswer = False
            }


decoder : D.Decoder RawInput
decoder =
    D.map8 RawInput
        (D.field "answer" D.string)
        (D.field "arrows" D.string)
        (D.field "devicePixelRatio" D.float)
        (D.field "fen" D.string)
        (D.field "moves" D.string)
        (D.field "prevMoves" D.string)
        (D.field "prompt" D.string)
        (D.field "showAnswer" D.bool)


parseMoves : String -> List String
parseMoves str =
    str
        |> String.split " "
        |> List.filter (not << String.isEmpty)


unencode : String -> String
unencode str =
    String.replace "\\n" "\n" str
