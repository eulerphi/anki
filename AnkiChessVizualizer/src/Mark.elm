module Mark exposing (..)

import Types exposing (Mark(..))


next : Mark -> Mark
next current =
    case current of
        NoMark ->
            Green

        Green ->
            Red

        Red ->
            NoMark
