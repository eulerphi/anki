module Main exposing (..)

import Array exposing (Array)
import Browser
import Browser.Dom
import Coord exposing (Coord)
import Css exposing (..)
import Delta exposing (Delta)
import DragInfo exposing (DragInfo)
import Draggable
import Draggable.Events
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (class, css, href, id, src)
import Html.Styled.Events exposing (onClick)
import Input
import Json.Encode as E
import Model exposing (Model)
import Msg exposing (..)
import Random
import Random.Array
import Task
import Tile exposing (Tile)



-- INIT


init : E.Value -> ( Model, Cmd Msg )
init flags =
    ( Input.decode flags |> Model.init, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions m =
    Sub.none


view : Model -> Html Msg
view m =
    div
        [ css
            [ position relative
            , width (Tile.wordWidth m.word |> px)
            , margin auto
            ]
        ]
        (Model.tiles m |> List.map Tile.view)



-- MAIN


dragConfig : Draggable.Config String Msg
dragConfig =
    Draggable.customConfig
        [ Draggable.Events.onDragStart <| StartDrag
        , Draggable.Events.onDragBy <| DragMove << Delta.init
        , Draggable.Events.onDragEnd <| EndDrag
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg m =
    case msg of
        NoOp ->
            ( m, Cmd.none )

        DragMsg subMsg ->
            Draggable.update
                dragConfig
                subMsg
                m

        StartDrag id ->
            case m.active of
                Just _ ->
                    ( m, Cmd.none )

                Nothing ->
                    let
                        ( actives, inactives ) =
                            List.partition (\t -> t.id == id) m.tiles
                    in
                    case actives of
                        x :: [] ->
                            ( { m | active = Just x, tiles = inactives }, Cmd.none )

                        _ ->
                            ( m, Cmd.none )

        DragMove delta ->
            case m.active of
                Just x ->
                    let
                        x_ =
                            { x | pos = Coord.addX x.pos delta.dx }
                    in
                    ( { m | active = Just x_ }, Cmd.none )

                Nothing ->
                    ( m, Cmd.none )

        EndDrag ->
            case m.active of
                Just x ->
                    ( { m | active = Nothing, tiles = x :: m.tiles }, Cmd.none )

                Nothing ->
                    ( m, Cmd.none )


main : Program E.Value Model Msg
main =
    Browser.element
        { init = init
        , subscriptions = subscriptions
        , update = update
        , view = view >> toUnstyled
        }
