module Step exposing (..)

import Array exposing (Array)
import Input exposing (Input)
import Move exposing (Move)
import Notation
import PieceColor
import Position exposing (Position)


type alias Step =
    { move : Maybe Move
    , position : Position
    , prevMove : Maybe Move
    }


blackToMove : Step -> Bool
blackToMove s =
    not (whiteToMove s)


doMove : Step -> Move -> Step
doMove step mv =
    { move = Nothing
    , position = Position.doMove mv step.position
    , prevMove = Just mv
    }


initial : Step
initial =
    { move = Nothing
    , position = Position.initial
    , prevMove = Nothing
    }


fromInput : Input -> Array Step
fromInput input =
    let
        p =
            input.puzzle.position

        moves =
            input.puzzle.moves
    in
    makeSteps p Nothing moves |> Array.fromList


makeSteps : Position -> Maybe Move -> List String -> List Step
makeSteps position prevMove sans =
    case sans of
        [] ->
            [ { move = Nothing
              , position = position
              , prevMove = prevMove
              }
            ]

        x :: xs ->
            let
                move =
                    Notation.fromSan x position

                step =
                    { move = move
                    , position = position
                    , prevMove = prevMove
                    }

                tail =
                    move
                        |> Maybe.map (\mv -> Position.doMove mv position)
                        |> Maybe.map (\p -> makeSteps p move xs)
            in
            tail
                |> Maybe.map (\t -> step :: t)
                |> Maybe.withDefault [ step ]


whiteToMove : Step -> Bool
whiteToMove s =
    Position.sideToMove s.position == PieceColor.white
