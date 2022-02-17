module Puzzle exposing (Puzzle, decode)

import Array
import Json.Decode as D
import Piece
import Position exposing (Position)
import Square
import StringEx


type alias Puzzle =
    { position : Position
    , moves : List String
    , startMoveIndex : Int
    }


decode : D.Decoder Puzzle
decode =
    D.string |> D.andThen decodePuzzle


decodePuzzle : String -> D.Decoder Puzzle
decodePuzzle val =
    let
        lines =
            StringEx.unencodeNewlines val
                |> String.split "\n"
                |> List.map String.trim
                |> List.filter (not << String.isEmpty)
                |> Array.fromList

        position =
            Array.get 0 lines
                |> Maybe.andThen parsePosition

        ( moves, idx ) =
            Array.get 1 lines
                |> Maybe.map parseMoves
                |> Maybe.withDefault noMoves
    in
    case position of
        Nothing ->
            D.fail fenParseErrorMessage

        Just p ->
            if isValidPosition p then
                D.succeed
                    { position = p
                    , moves = moves
                    , startMoveIndex = idx
                    }

            else
                D.fail fenParseErrorMessage


fenParseErrorMessage : String
fenParseErrorMessage =
    String.join
        "\n"
        [ "Unable to parse Forsyth-Edwards Notation (FEN) input."
        , ""
        , "Expected format:"
        , "    <FEN>"
        , "    <space separated list of moves>"
        , ""
        , "If you want the default starting chess position, then use '-' as your FEN value."
        , ""
        , "For example:"
        , "    -"
        , "    e4 e5 Qh5"
        ]


isValidPosition : Position -> Bool
isValidPosition position =
    Square.all
        |> List.map (\sq -> Position.pieceOn sq position)
        |> List.filter
            (\piece ->
                case piece of
                    Just p ->
                        p == Piece.blackKing || p == Piece.whiteKing

                    Nothing ->
                        False
            )
        |> List.length
        |> (==) 2



-- Position.moves p |> List.isEmpty |> not


noMoves : ( List String, Int )
noMoves =
    ( [], 0 )


parsePosition : String -> Maybe Position
parsePosition val =
    if val == "-" then
        Just Position.initial

    else
        Position.fromFen val


parseMoves : String -> ( List String, Int )
parseMoves val =
    let
        items =
            val
                |> String.split "|"
                |> List.map (String.split " ")
                |> List.map (List.filter (not << String.isEmpty))

        startMoveIdx =
            if List.length items == 1 then
                0

            else
                List.head items
                    |> Maybe.withDefault []
                    |> List.length
    in
    if val == "-" then
        noMoves

    else
        ( List.concat items, startMoveIdx )
