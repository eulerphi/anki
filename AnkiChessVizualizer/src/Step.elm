module Step exposing (..)

import Array exposing (Array)
import Input exposing (Input)
import Move exposing (Move)
import Notation
import PieceColor
import Position exposing (Position)


type alias MoveEx =
    { move : Move
    , san : String
    }


type alias Step =
    { move : Maybe MoveEx
    , number : Int
    , position : Position
    , prevMove : Maybe MoveEx
    }


fromInput : Input -> Array Step
fromInput input =
    Position.fromFen input.fen
        |> Maybe.map (\p -> makeSteps 1 p Nothing input.moves)
        |> Maybe.withDefault []
        |> Array.fromList


makeSteps : Int -> Position -> Maybe MoveEx -> List String -> List Step
makeSteps number position prevMove sans =
    case sans of
        [] ->
            [ { move = Nothing
              , number = number
              , position = position
              , prevMove = prevMove
              }
            ]

        x :: xs ->
            let
                move =
                    Notation.fromSan x position
                        |> Maybe.map (\m -> MoveEx m x)

                step =
                    { move = move
                    , number = number
                    , position = position
                    , prevMove = prevMove
                    }

                nextNumber =
                    if Position.sideToMove position == PieceColor.black then
                        number + 1

                    else
                        number

                tail =
                    move
                        |> Maybe.map (\m -> Position.doMove m.move position)
                        |> Maybe.map (\p -> makeSteps nextNumber p move xs)
            in
            tail
                |> Maybe.map (\t -> step :: t)
                |> Maybe.withDefault []
