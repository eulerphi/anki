module Tile exposing (..)

import Array exposing (Array)
import Coord exposing (Coord)
import Css exposing (..)
import Delta exposing (Delta)
import Draggable
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (class, css, href, id, src)
import Html.Styled.Events exposing (onClick)
import Msg exposing (..)
import Random
import Random.Array


type alias Tile =
    { id : String
    , letter : Char
    , pos : Coord
    }


fromWord : String -> List Tile
fromWord word =
    word
        |> String.toList
        |> List.indexedMap toTile


toId : Int -> String
toId idx =
    "tile-" ++ String.fromInt idx


toPos : Int -> Coord
toPos idx =
    Coord (toFloat idx * 72) 0


toTile : Int -> Char -> Tile
toTile idx letter =
    Tile (toId idx) letter (toPos idx)


shuffle : Random.Seed -> List Tile -> List Tile
shuffle seed tiles =
    let
        ts =
            Array.fromList tiles
    in
    Random.step (Random.Array.shuffle ts) seed
        |> Tuple.first
        |> Array.toList


wordWidth : String -> Float
wordWidth word =
    (String.length word * 72 - 12)
        |> toFloat


style : Tile -> List Style
style tile =
    [ height (px 62)
    , width (px 62)
    , position absolute
    , left (px tile.pos.x)
    , boxSizing borderBox
    , fontSize (Css.em 2)
    , lineHeight (Css.em 2)
    , textTransform uppercase
    , display inlineFlex
    , justifyContent center
    , alignItems center
    , color (hex "FFFFFF")
    , backgroundColor (hex "787c7e")
    , property "user-select" "none"
    ]


tileAttrs : Tile -> List (Attribute Msg)
tileAttrs tile =
    let
        mouseEvt =
            Draggable.mouseTrigger tile.id DragMsg

        touchEvts =
            Draggable.touchTriggers tile.id DragMsg

        evts =
            (mouseEvt :: touchEvts)
                |> List.map Html.Styled.Attributes.fromUnstyled
    in
    id tile.id
        :: css (style tile)
        :: evts


view : Tile -> Html Msg
view tile =
    div
        (tileAttrs tile)
        [ tile.letter |> String.fromChar |> text ]



-- viewLetter : Model -> Int -> Char -> Html Msg
-- viewLetter m idx c =
--     let
--         mouseEvt =
--             Draggable.mouseTrigger idx DragMsg
--         touchEvts =
--             Draggable.touchTriggers idx DragMsg
--         evts =
--             (mouseEvt :: touchEvts)
--                 |> List.map Html.Styled.Attributes.fromUnstyled
--         dragStyles =
--             if idx == m.dragging.idx then
--                 [ position absolute
--                 , top (px m.dragging.y)
--                 , left (px <| m.dragging.x + m.dragging.delta.dx)
--                 ]
--             else
--                 []
--     in
--     div
--         (id (tileId idx) :: css (dragStyles ++ letterStyle) :: evts)
--         [ String.fromChar c |> text ]
-- startDrag : Tile -> Coord -> Tile
-- startDrag tile coord =
--     { tile |  = Just coord }
-- dragMove : Tile -> Delta -> Tile
-- dragMove tile delta =
--     case tile.dragPos of
--         Nothing ->
--             tile
--         Just coord ->
--             let
--                 coord_ =
--                     { x = coord.x + delta.dx
--                     , y = coord.y
--                     }
--             in
--             { tile | dragPos = Just coord_ }
-- endDrag : Tile -> Tile
-- endDrag tile =
--     { tile | dragPos = Nothing }
