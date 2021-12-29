module Mark exposing (..)

import Model exposing (Mark(..))


next : Mark -> Mark
next current =
    case current of
        NoMark ->
            Green

        Green ->
            Red

        Red ->
            NoMark
