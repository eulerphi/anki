module Log exposing (toLines)

import Array
import ListEx
import Model
import Notation
import PieceColor
import Step exposing (Step)
import Types exposing (..)


toLines : Model -> List LogLine
toLines m =
    toItems m |> makeLines


dummyFirstItem : Model -> LogItem
dummyFirstItem m =
    { selected = m.idx == 0, text = Just "..." }


makeLines : List LogItem -> List LogLine
makeLines sans =
    case sans of
        [] ->
            []

        _ :: [] ->
            []

        x1 :: x2 :: xs ->
            { white = x1, black = x2 } :: makeLines xs


toItems : Model -> List LogItem
toItems m =
    let
        lines =
            Array.toList m.steps
                |> List.indexedMap (toItem m)
    in
    if Model.startColor m == PieceColor.white then
        lines

    else
        (dummyFirstItem m :: lines)
            |> ListEx.popBack
            |> Tuple.second


toItem : Model -> Int -> Step -> LogItem
toItem m idx s =
    { selected = m.idx == (idx + 1)
    , text =
        if (Array.length m.steps - 1) == idx then
            Nothing

        else if m.idx > idx then
            s.move |> Maybe.map (\mv -> Notation.toSan mv s.position)

        else
            Just "???"
    }
