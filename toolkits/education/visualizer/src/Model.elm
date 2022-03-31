module Model exposing (..)

import Draggable
import Input exposing (Input)
import Random
import Tile exposing (Tile)


type alias Model =
    { active : Maybe Tile
    , drag : Draggable.State String
    , tiles : List Tile
    , word : String
    }


init : Input -> Model
init input =
    let
        seed =
            Random.initialSeed input.seed

        ts =
            if input.showAnswer then
                Tile.fromWord input.word

            else
                Tile.fromWord input.word
                    |> Tile.shuffle seed
    in
    { active = Nothing
    , drag = Draggable.init
    , tiles = ts
    , word = input.word
    }


tiles : Model -> List Tile
tiles m =
    case m.active of
        Just t ->
            t :: m.tiles

        Nothing ->
            m.tiles
