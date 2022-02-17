module Input exposing (Input, decode)

import Json.Decode as D
import Puzzle exposing (Puzzle)


type alias Input =
    { answer : String
    , arrows : String
    , devicePixelRatio : Float
    , prompt : String
    , puzzle : Puzzle
    , showAnswer : Bool
    }


decode : D.Decoder Input
decode =
    D.map6 Input
        (D.field "answer" D.string)
        (D.field "arrows" D.string)
        (D.field "devicePixelRatio" D.float)
        (D.field "prompt" D.string)
        (D.field "puzzle" Puzzle.decode)
        (D.field "showAnswer" D.bool)
