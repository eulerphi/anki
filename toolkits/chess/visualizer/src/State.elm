module State exposing (..)

import Dict
import Mark
import Square exposing (Square)
import Step exposing (Step)
import Types exposing (..)


clearAnnotations : State -> State
clearAnnotations s =
    { s | arrows = [], marks = Dict.empty }


empty : State
empty =
    { arrows = []
    , marks = Dict.empty
    , step = Step.initial
    }


fromStep : Step -> State
fromStep step =
    { arrows = []
    , marks = Dict.empty
    , step = step
    }


updateArrows : State -> List Arrow -> State
updateArrows s arrows =
    { s | arrows = arrows }


updateArrow : State -> Arrow -> State
updateArrow s arrow =
    let
        ( haves, havenots ) =
            s.arrows |> List.partition (\a -> a == arrow)

        arrows_ =
            if List.length haves > 0 then
                havenots

            else
                arrow :: s.arrows
    in
    { s | arrows = arrows_ }


updateMark : State -> Square -> State
updateMark state sq =
    let
        key =
            Square.toInt sq

        val =
            Dict.get key state.marks
                |> Maybe.withDefault NoMark
                |> Mark.next

        marks_ =
            if val /= NoMark then
                Dict.insert key val state.marks

            else
                Dict.remove key state.marks
    in
    { state | marks = marks_ }


updateStep : State -> Step -> State
updateStep s step_ =
    { s | step = step_ }
