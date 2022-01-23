module Log exposing (toLines)

import Array
import ListEx
import PieceColor
import Step exposing (Step)
import Types exposing (..)


toLines : Model -> List LogLine
toLines m =
    toItems m |> makeLines


dummyFirstItem : Model -> LogItem
dummyFirstItem m =
    { selected = m.idx == 0, text = Just "..." }


dummyLastItem : LogItem
dummyLastItem =
    { selected = False, text = Nothing }


makeLines : List LogItem -> List LogLine
makeLines sans =
    case sans of
        [] ->
            []

        x1 :: [] ->
            [ { white = x1, black = dummyLastItem } ]

        x1 :: x2 :: xs ->
            { white = x1, black = x2 } :: makeLines xs


toItems : Model -> List LogItem
toItems m =
    let
        lines =
            Array.toList m.steps
                |> List.indexedMap (toItem m)
    in
    if m.playerColor == PieceColor.white then
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
            Just ""

        else if m.idx > idx then
            Maybe.map .san s.move

        else
            Just "???"
    }
