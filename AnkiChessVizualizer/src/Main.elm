module Main exposing (..)

import Array exposing (Array)
import Board exposing (Board, Mark(..))
import Browser
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes as HtmlAttrs
import Html.Events
import Input exposing (Input)
import Json.Decode
import Json.Encode as E
import MaybeEx
import PieceColor exposing (PieceColor)
import Position exposing (Position)
import Square exposing (Square)
import Step exposing (Step)
import StringEx
import ViewContext exposing (ViewContext)



-- MODEL / INIT


type alias Model =
    { board : Board
    , current : { idx : Int, step : Maybe Step }
    , marks : Dict Int Board.Mark
    , playerColor : PieceColor
    , prompt : String
    , steps : Array Step
    , viewCtx : ViewContext Msg
    }


type Msg
    = NoOp
    | ClearMarks
    | MarkSquare Square
    | NextMove
    | PrevMove
    | ViewCtxMsg ViewContext.Msg


initFromInput : Input -> Model
initFromInput input =
    let
        steps =
            Step.fromInput input

        current =
            { idx = 0, step = Array.get 0 steps }

        playerColor =
            current.step
                |> Maybe.map .position
                |> Maybe.map Position.sideToMove
                |> Maybe.withDefault PieceColor.white
    in
    { board = Board.none
    , current = current
    , marks = Dict.empty
    , playerColor = playerColor
    , prompt = input.prompt
    , steps = steps
    , viewCtx =
        ViewContext.init
            { devicePixelRatio = input.devicePixelRatio
            , envelope = ViewCtxMsg
            }
    }


init : E.Value -> ( Model, Cmd Msg )
init flags =
    let
        m =
            flags |> Input.decode |> initFromInput
    in
    ( m, ViewContext.initCmd m.viewCtx )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions m =
    Sub.batch [ ViewContext.subscriptions m.viewCtx ]



-- VIEW


view : Model -> Html Msg
view m =
    Html.div
        []
        [ Html.div
            [ HtmlAttrs.style "height" (StringEx.pixelLength m.board.headerHeight)
            , HtmlAttrs.style "width" ((0.9 * m.viewCtx.size.width |> String.fromFloat) ++ "px")
            , HtmlAttrs.style "display" "flex"
            , HtmlAttrs.style "align-items" "center"
            , HtmlAttrs.style "justify-content" "center"
            , HtmlAttrs.style "margin" "0 auto"
            ]
            [ Html.button
                [ HtmlAttrs.style "padding" "5px 5px"
                , HtmlAttrs.style "font-size" "24px"
                , Html.Events.onClick ClearMarks
                ]
                [ Html.text "clear marks" ]
            , Html.button
                [ HtmlAttrs.style "padding" "5px 5px"
                , HtmlAttrs.style "font-size" "24px"
                , HtmlAttrs.style "margin" "0px 20px"
                , Html.Events.onClick PrevMove
                ]
                [ Html.text "< prev move" ]
            , Html.button
                [ HtmlAttrs.style "padding" "5px 5px"
                , HtmlAttrs.style "font-size" "24px"
                , Html.Events.onClick NextMove
                ]
                [ Html.text "next move >" ]
            ]
        , Html.table
            [ HtmlAttrs.style "margin" "0 auto"
            , HtmlAttrs.style "border-collapse" "collapse"
            ]
            [ Html.tr
                []
                [ Html.td
                    [ HtmlAttrs.style "height" (StringEx.pixelLength m.board.panelHeight)
                    , HtmlAttrs.style "width" (StringEx.pixelLength m.board.panelWidth)
                    , HtmlAttrs.style "padding" "0px 20px"
                    , HtmlAttrs.style "font-size" "24px"
                    , HtmlAttrs.style "border" "2px solid gray"
                    , HtmlAttrs.style "vertical-align" "top"
                    ]
                    [ Html.div
                        [ HtmlAttrs.style "border-bottom" "2px solid gray"
                        , HtmlAttrs.style "margin-bottom" "15px"
                        ]
                        [ Html.text m.prompt ]
                    , Html.table [] (viewLog m.current.idx m.steps)
                    ]
                , Html.td
                    [ HtmlAttrs.style "height" (StringEx.pixelLength m.board.boardSize)
                    , HtmlAttrs.style "width" (StringEx.pixelLength m.board.boardSize)
                    , HtmlAttrs.style "padding-left" (StringEx.pixelLength m.board.squareSize)
                    ]
                    [ Html.div
                        [ HtmlAttrs.style "height" (StringEx.pixelLength m.board.boardSize)
                        , HtmlAttrs.style "width" (StringEx.pixelLength m.board.boardSize)
                        , HtmlAttrs.style "position" "relative"
                        , HtmlAttrs.style "border" "2px solid gray"
                        ]
                        [ m.current.step
                            |> Board.view
                                { arrows = []
                                , board = m.board
                                , marks = m.marks
                                , noopMsg = NoOp
                                , playerColor = m.playerColor
                                , clickSquareMsg = MarkSquare
                                }
                        ]
                    ]
                ]
            ]
        ]


viewLogStep : Int -> Int -> Step -> Html msg
viewLogStep stepIdx idx step =
    let
        numberSuffix =
            if Position.sideToMove step.position == PieceColor.white then
                ".  "

            else
                "..."

        text =
            if idx < stepIdx then
                step.move |> Maybe.map .san |> Maybe.withDefault ""

            else
                "???"

        ( highlightCss, highlightContent ) =
            if stepIdx == idx then
                ( [ HtmlAttrs.style "color" "blue"
                  , HtmlAttrs.style "font-weight" "bold"
                  ]
                , ">"
                )

            else
                ( [], "" )
    in
    Html.tr
        highlightCss
        [ Html.td
            [ HtmlAttrs.style "width" "10%"
            , HtmlAttrs.style "text-align" "right"
            ]
            [ Html.text highlightContent ]
        , Html.td
            [ HtmlAttrs.style "width" "10%" ]
            [ Html.span [] [ Html.text (String.fromInt step.number) ]
            , Html.span [] [ Html.text numberSuffix ]
            ]
        , Html.td
            [ HtmlAttrs.style "width" "80%" ]
            [ Html.span [] [ Html.text text ] ]
        ]


viewLog : Int -> Array Step -> List (Html msg)
viewLog idx steps =
    steps
        |> Array.toList
        |> List.filter (\s -> MaybeEx.hasValue s.move)
        |> List.indexedMap (viewLogStep idx)



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg m =
    case msg of
        NoOp ->
            ( m, Cmd.none )

        ClearMarks ->
            ( { m | marks = Dict.empty }, Cmd.none )

        MarkSquare square ->
            let
                key =
                    Square.toInt square

                val =
                    Dict.get key m.marks
                        |> Maybe.withDefault NoMark
                        |> Board.nextMark

                marks_ =
                    if val /= NoMark then
                        Dict.insert key val m.marks

                    else
                        Dict.remove key m.marks

                m_ =
                    { m | marks = marks_ }
            in
            ( m_, Cmd.none )

        NextMove ->
            let
                idx_ =
                    min (m.current.idx + 1) (Array.length m.steps - 1)

                step_ =
                    Array.get idx_ m.steps

                m_ =
                    { m | current = { idx = idx_, step = step_ }, marks = Dict.empty }
            in
            ( m_, Cmd.none )

        PrevMove ->
            let
                idx_ =
                    max 0 (m.current.idx - 1)

                step_ =
                    Array.get idx_ m.steps

                m_ =
                    { m | current = { idx = idx_, step = step_ }, marks = Dict.empty }
            in
            ( m_, Cmd.none )

        ViewCtxMsg subMsg ->
            let
                ( vc_, cmd_ ) =
                    ViewContext.update subMsg m.viewCtx
            in
            ( { m | board = Board.fromViewContext m.board vc_, viewCtx = vc_ }, cmd_ )



-- MAIN


main : Program E.Value Model Msg
main =
    Browser.element
        { init = init
        , subscriptions = subscriptions
        , update = update
        , view = view
        }
