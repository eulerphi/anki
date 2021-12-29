module View exposing (view)

import Array
import Board exposing (Board)
import CssEx
import Dict
import Html exposing (Html)
import Html.Attributes as HtmlAttrs
import Html.Events
import Images
import Model exposing (..)
import Move
import Piece
import PieceColor
import Position
import Square exposing (Square)
import SquareFile
import SquareRank
import Step exposing (Step)
import Svg
import Svg.Attributes as SvgAttrs


view : Model -> Html Msg
view m =
    [ center, leftBar, rightBar ]
        |> List.map (\fn -> fn m)
        |> Html.div []



----------------------------------------------------------
-- TOP-LEVEL COMPONENTS
----------------------------------------------------------


{-| BOARD
-}
board_ : Model -> Html Msg
board_ m =
    case m.step of
        Nothing ->
            Html.div [] []

        Just s ->
            [ coords, indicator, squares s, marks, pieces s, arrows, selected ]
                |> List.map (\fn -> fn m)
                |> Html.div
                    [ HtmlAttrs.style "position" "relative"
                    , HtmlAttrs.style "width" (CssEx.px m.board.boardSize)
                    , HtmlAttrs.style "height" (CssEx.px m.board.boardSize)
                    , HtmlAttrs.style "margin-left" (CssEx.px m.board.squareSize)
                    , HtmlAttrs.style "border" "2px solid gray"
                    , HtmlAttrs.style "background-size" "cover"
                    , HtmlAttrs.style "background-image" (Images.boardUri m.board.style)
                    , HtmlAttrs.style "background-repeat" "no-repeat"
                    ]


{-| CENTER
-}
center : Model -> Html Msg
center m =
    [ log, board_ ]
        |> List.map (\fn -> fn m)
        |> Html.div
            [ HtmlAttrs.style "height" (CssEx.px m.viewCtx.size.height)
            , HtmlAttrs.style "width" "100%"
            , HtmlAttrs.style "display" "flex"
            , HtmlAttrs.style "align-items" "center"
            , HtmlAttrs.style "justify-content" "center"
            ]


{-| LOG
-}
log : Model -> Html Msg
log m =
    m.steps
        |> Array.toList
        |> List.indexedMap (logStep m)
        |> Html.table
            [ HtmlAttrs.style "border-collapse" "collapse" ]
        |> (\x -> [ x ])
        |> (::)
            (Html.div
                [ HtmlAttrs.style "border-bottom" "2px solid gray"
                , HtmlAttrs.style "margin-bottom" "15px"
                ]
                [ Html.text m.prompt ]
            )
        |> Html.div
            [ HtmlAttrs.style "height" (CssEx.px m.board.panelHeight)
            , HtmlAttrs.style "width" (CssEx.px m.board.panelWidth)
            , HtmlAttrs.style "border" "2px solid gray"
            , HtmlAttrs.style "font-size" "24px"
            , HtmlAttrs.style "vertical-align" "top"
            , HtmlAttrs.style "padding" "0px 20px"
            ]


logStep : Model -> Int -> Step -> Html Msg
logStep m idx step =
    let
        numberSuffix =
            if Position.sideToMove step.position == PieceColor.white then
                ".  "

            else
                "..."

        text =
            if idx < m.idx then
                step.move |> Maybe.map .san |> Maybe.withDefault ""

            else if idx == (Array.length m.steps - 1) then
                "✅"

            else
                "???"

        selectedCss =
            if idx == m.idx then
                [ HtmlAttrs.style "width" "0px"
                , HtmlAttrs.style "height" "0px"
                , HtmlAttrs.style "border-top" "12px solid transparent"
                , HtmlAttrs.style "border-bottom" "12px solid transparent"
                , HtmlAttrs.style "border-left" "12px solid blue"
                ]

            else
                []
    in
    Html.tr
        []
        [ Html.td
            [ HtmlAttrs.style "width" "10%" ]
            [ Html.div selectedCss [] ]
        , Html.td
            [ HtmlAttrs.style "width" "10%" ]
            [ Html.span [] [ Html.text (String.fromInt step.number) ]
            , Html.span [] [ Html.text numberSuffix ]
            ]
        , Html.td
            [ HtmlAttrs.style "width" "80%" ]
            [ Html.span [] [ Html.text text ] ]
        ]


{-| SIDEBARS
-}
sidebar : Model -> List (Html.Attribute Msg) -> Html Msg -> Html Msg
sidebar m attrs child =
    [ HtmlAttrs.style "position" "fixed"
    , HtmlAttrs.style "top" "0px"
    , HtmlAttrs.style "height" (CssEx.px m.viewCtx.size.height)
    , HtmlAttrs.style "display" "flex"
    , HtmlAttrs.style "align-items" "center"
    ]
        |> (++) attrs
        |> (\a -> Html.div a [ child ])


sidebarButton : Msg -> String -> Bool -> Html Msg
sidebarButton msg text isSelected =
    let
        css =
            [ HtmlAttrs.style "display" "block"
            , HtmlAttrs.style "margin" "10px 0px"
            , HtmlAttrs.style "width" "100%"
            , HtmlAttrs.style "min-width" "48px"
            , HtmlAttrs.style "height" "48px"
            , HtmlAttrs.style "font-size" "24px"
            , Html.Events.onClick msg
            ]

        css_ =
            if isSelected then
                HtmlAttrs.style "background-color" "blue" :: css

            else
                css
    in
    Html.button
        css_
        [ Html.text text ]


leftBar : Model -> Html Msg
leftBar m =
    [ sidebarButton PrevMove "<" False
    , sidebarButton NextMove ">" False
    ]
        |> Html.div []
        |> sidebar m [ HtmlAttrs.style "left" "5px" ]


rightBar : Model -> Html Msg
rightBar m =
    [ ( "AR", Arrowing )
    , ( "MA", Marking )
    , ( "MO", Moving )
    ]
        |> List.map
            (\( text, mode ) -> sidebarButton (SelectMode mode) text (m.mode == mode))
        |> (::) (Html.hr [ HtmlAttrs.style "margin" "20px 0px" ] [])
        |> (::) (sidebarButton Clear "x" False)
        |> Html.div []
        |> sidebar m [ HtmlAttrs.style "right" "5px" ]



----------------------------------------------------------
-- SUBCOMPONENTS
----------------------------------------------------------


{-| ARROWS
-}
arrows : Model -> Html Msg
arrows m =
    let
        attrs =
            [ SvgAttrs.viewBox "0 0 8 8"
            , SvgAttrs.pointerEvents "none"
            , SvgAttrs.opacity "0.6"
            , SvgAttrs.z "2"
            ]

        defs =
            Svg.defs
                []
                [ Svg.marker
                    [ SvgAttrs.id "arrowhead"
                    , SvgAttrs.markerWidth "4"
                    , SvgAttrs.markerHeight "8"
                    , SvgAttrs.refX "2.05"
                    , SvgAttrs.refY "2.01"
                    , SvgAttrs.orient "auto"
                    ]
                    [ Svg.path
                        [ SvgAttrs.d "M0,0 V4 L3,2 Z"
                        , SvgAttrs.fill arrowColor
                        ]
                        []
                    ]
                ]
    in
    m.arrows
        |> List.map arrow_
        |> (\xs -> Svg.svg attrs (defs :: xs))


arrow_ : Arrow -> Html Msg
arrow_ arrow =
    let
        src =
            arrow.src |> centerPoint

        dst =
            arrow.dst |> centerPoint
    in
    Svg.line
        [ SvgAttrs.x1 (String.fromFloat src.x)
        , SvgAttrs.y1 (String.fromFloat src.y)
        , SvgAttrs.x2 (String.fromFloat dst.x)
        , SvgAttrs.y2 (String.fromFloat dst.y)
        , SvgAttrs.stroke arrowColor
        , SvgAttrs.strokeLinecap "round"
        , SvgAttrs.strokeWidth "0.15625"
        , SvgAttrs.markerEnd "url(#arrowhead)"
        ]
        []


{-| COORDS
-}
coords : Model -> Html Msg
coords m =
    let
        ranks =
            SquareRank.all
                |> List.map (\r -> ( r, r ))
                |> List.map (Tuple.mapBoth SquareRank.toString SquareRank.toIndex)
                |> List.map (Tuple.mapSecond ((+) 1))
                |> List.map (Tuple.mapSecond (\idx -> Pos idx 0))
                |> List.map
                    (coord m
                        [ HtmlAttrs.style "justify-content" "right"
                        , HtmlAttrs.style "align-items" "center"
                        ]
                    )

        files =
            SquareFile.all
                |> List.map (\f -> ( f, f ))
                |> List.map (Tuple.mapBoth SquareFile.toString SquareFile.toIndex)
                |> List.map (Tuple.mapSecond ((+) 1))
                |> List.map (Tuple.mapSecond (\idx -> Pos 0 idx))
                |> List.map
                    (coord m
                        [ HtmlAttrs.style "justify-content" "center"
                        , HtmlAttrs.style "align-items" "top"
                        ]
                    )
    in
    Html.div [] (ranks ++ files)


coord : Model -> List (Html.Attribute Msg) -> ( String, Pos ) -> Html Msg
coord m attrs ( text, pos ) =
    Html.div
        (attrs
            ++ [ HtmlAttrs.style "display" "flex"
               , HtmlAttrs.style "height" "12.5%"
               , HtmlAttrs.style "width" "12.5%"
               , HtmlAttrs.style "transform" (translate m.board pos)
               , HtmlAttrs.style "position" "absolute"
               , HtmlAttrs.style "top" "0"
               , HtmlAttrs.style "left" "0"
               , HtmlAttrs.style "font-size" "24px"
               ]
        )
        [ Html.div [ HtmlAttrs.style "margin" "15%" ] [ Html.text text ] ]


{-| INDICATOR
-}
indicator : Model -> Html Msg
indicator m =
    let
        color =
            if m.playerColor == PieceColor.white then
                "white"

            else
                "black"
    in
    Html.div
        [ HtmlAttrs.style "height" "12.5%"
        , HtmlAttrs.style "width" "12.5%"
        , HtmlAttrs.style "transform" (translate m.board { rank = 1, file = 9 })
        , HtmlAttrs.style "position" "absolute"
        , HtmlAttrs.style "top" "0"
        , HtmlAttrs.style "left" "0"
        , HtmlAttrs.style "justify-content" "center"
        , HtmlAttrs.style "align-items" "center"
        , HtmlAttrs.style "display" "flex"
        ]
        [ Html.div
            [ HtmlAttrs.style "height" "50%"
            , HtmlAttrs.style "width" "50%"
            , HtmlAttrs.style "background-color" color
            , HtmlAttrs.style "border" "4px solid black"
            , HtmlAttrs.style "border-radius" "50%"
            ]
            []
        ]


{-| MARKS
-}
marks : Model -> Html Msg
marks m =
    Square.all
        |> List.map (mark_ m)
        |> List.foldr (++) []
        |> Html.div [ HtmlAttrs.style "pointer-events" "none" ]


mark_ : Model -> Square -> List (Html Msg)
mark_ input square =
    let
        mark =
            Square.toInt square
                |> (\sq -> Dict.get sq input.marks)
                |> Maybe.withDefault NoMark

        color =
            case mark of
                NoMark ->
                    ""

                Green ->
                    "green"

                Red ->
                    "red"
    in
    if color == "" then
        []

    else
        [ Html.div
            [ HtmlAttrs.style "height" "12.5%"
            , HtmlAttrs.style "width" "12.5%"
            , HtmlAttrs.style "transform" (square |> toPos |> translate input.board)
            , HtmlAttrs.style "position" "absolute"
            , HtmlAttrs.style "top" "0"
            , HtmlAttrs.style "left" "0"
            , HtmlAttrs.style "justify-content" "center"
            , HtmlAttrs.style "align-items" "center"
            , HtmlAttrs.style "display" "flex"
            ]
            [ Html.div
                [ HtmlAttrs.style "pointer-events" "none"
                , HtmlAttrs.style "border-radius" "50%"
                , HtmlAttrs.style "border" ("4px solid " ++ color)
                , HtmlAttrs.style "height" "80%"
                , HtmlAttrs.style "width" "80%"
                ]
                []
            ]
        ]


{-| SELECTED
-}
selected : Model -> Html Msg
selected m =
    case m.selected of
        Nothing ->
            Html.div [] []

        Just sq ->
            modeColor m
                |> Maybe.map (selected_ sq)
                |> Maybe.withDefault (Html.div [] [])


selected_ : Square -> String -> Html Msg
selected_ sq color =
    let
        { x, y } =
            sq |> centerPoint
    in
    Html.div
        [ HtmlAttrs.style "width" "100%"
        , HtmlAttrs.style "height" "100%"
        , HtmlAttrs.style "position" "absolute"
        , HtmlAttrs.style "top" "0"
        , HtmlAttrs.style "left" "0"
        , HtmlAttrs.style "pointer-events" "none"
        ]
        [ Svg.svg
            [ SvgAttrs.viewBox "0 0 8 8"
            , SvgAttrs.opacity "0.6"
            , SvgAttrs.z "3"
            ]
            [ Svg.rect
                [ SvgAttrs.x (x - 0.5 |> String.fromFloat)
                , SvgAttrs.y (y - 0.5 |> String.fromFloat)
                , SvgAttrs.width "1"
                , SvgAttrs.height "1"
                , SvgAttrs.fill color
                ]
                []
            ]
        ]


{-| PIECES
-}
pieces : Step -> Model -> Html Msg
pieces step m =
    Square.all
        |> List.map (piece_ step m)
        |> List.foldr (++) []
        |> Html.div [ HtmlAttrs.style "pointer-events" "none" ]


piece_ : Step -> Model -> Square -> List (Html Msg)
piece_ step m square =
    case Position.pieceOn square step.position of
        Nothing ->
            []

        Just p ->
            let
                div =
                    Html.div
                        [ HtmlAttrs.style "height" "12.5%"
                        , HtmlAttrs.style "width" "12.5%"
                        , HtmlAttrs.style "position" "absolute"
                        , HtmlAttrs.style "top" "0"
                        , HtmlAttrs.style "left" "0"
                        , HtmlAttrs.style "transform" (toPos square |> translate m.board)
                        , HtmlAttrs.style "background-image" (p |> Piece.toChar |> Images.pieceUri)
                        , HtmlAttrs.style "background-repeat" "no-repeat"
                        , HtmlAttrs.style "background-size" "cover"
                        ]
                        []
            in
            [ div ]


{-| SQUARES
-}
squares : Step -> Model -> Html Msg
squares step m =
    Square.all
        |> List.map (square_ step m)
        |> Html.div []


square_ : Step -> Model -> Square -> Html Msg
square_ step m sq =
    let
        btnAttrs =
            [ HtmlAttrs.style "height" "12.5%"
            , HtmlAttrs.style "width" "12.5%"
            , HtmlAttrs.style "position" "absolute"
            , HtmlAttrs.style "top" "0"
            , HtmlAttrs.style "left" "0"
            , HtmlAttrs.style "transform" (sq |> toPos |> translate m.board)
            , HtmlAttrs.style "border" "none"
            , Html.Events.onClick (ClickSquare sq)
            , Html.Events.onDoubleClick NoOp
            ]

        moveAttrs =
            case step.prevMove of
                Nothing ->
                    [ HtmlAttrs.style "opacity" "0" ]

                Just pm ->
                    if Move.from pm.move == sq || Move.to pm.move == sq then
                        [ HtmlAttrs.style "background-color" "yellow"
                        , HtmlAttrs.style "opacity" "0.3"
                        ]

                    else
                        [ HtmlAttrs.style "opacity" "0" ]
    in
    Html.button
        (btnAttrs ++ moveAttrs)
        []



----------------------------------------------------------
-- STYLING
----------------------------------------------------------


modeColor : Model -> Maybe String
modeColor m =
    case m.mode of
        Arrowing ->
            Just arrowColor

        Moving ->
            Just moveColor

        _ ->
            Nothing


arrowColor : String
arrowColor =
    "#003088"


moveColor : String
moveColor =
    "#e68f00"



----------------------------------------------------------
-- UTILS
----------------------------------------------------------


centerPoint : Square -> Point
centerPoint square =
    { x =
        Square.file square
            |> SquareFile.toIndex
            |> toFloat
            |> (+) 0.5
    , y =
        Square.rank square
            |> SquareRank.toIndex
            |> (\r -> 7 - r)
            |> toFloat
            |> (+) 0.5
    }


toPos : Square -> Pos
toPos square =
    { rank = Square.rank square |> SquareRank.toIndex |> (+) 1
    , file = Square.file square |> SquareFile.toIndex |> (+) 1
    }


translate : Board -> Pos -> String
translate board pos =
    let
        x =
            pos.file - 1 |> toFloat |> (*) board.squareSize

        y =
            8 - pos.rank |> toFloat |> (*) board.squareSize
    in
    String.join
        ""
        [ "translate("
        , String.fromFloat x
        , "px, "
        , String.fromFloat y
        , "px)"
        ]
