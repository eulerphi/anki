module View exposing (view)

import CssEx
import Dict
import Html exposing (Html)
import Html.Attributes as HtmlAttrs
import Html.Events
import Images
import Log
import Move
import Piece
import PieceColor
import Point
import Position
import Square exposing (Square)
import SquareFile
import SquareRank
import Step exposing (Step)
import Svg
import Svg.Attributes as SvgAttrs
import Types exposing (..)


view : Model -> Html Msg
view m =
    [ center, rightBar ]
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
            [ coords, squares s, marks, pieces s, arrows, selected ]
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
    [ panel, board_ ]
        |> List.map (\fn -> fn m)
        |> Html.div
            [ HtmlAttrs.style "height" (CssEx.px m.viewCtx.size.height)
            , HtmlAttrs.style "width" "100%"
            , HtmlAttrs.style "display" "flex"
            , HtmlAttrs.style "align-items" "center"
            , HtmlAttrs.style "justify-content" "center"
            ]


{-| PANEL
-}
panel : Model -> Html Msg
panel m =
    Html.div
        [ HtmlAttrs.style "height" (CssEx.px m.board.panelHeight)
        , HtmlAttrs.style "width" (CssEx.px m.board.panelWidth)
        , HtmlAttrs.style "overflow" "hidden"
        , HtmlAttrs.style "display" "flex"
        , HtmlAttrs.style "flex-direction" "column"
        , HtmlAttrs.style "gap" "1rem"
        ]
        [ Html.div
            [ HtmlAttrs.style "flex" "0 1 auto"
            , HtmlAttrs.style "border" "1px solid gray"
            , HtmlAttrs.style "border-radius" "3px"
            ]
            [ header m ]
        , Html.div
            [ HtmlAttrs.style "flex" "1 0 auto"
            , HtmlAttrs.style "border" "1px solid gray"
            , HtmlAttrs.style "border-radius" "3px"
            ]
            [ log m ]
        ]


{-| SIDEBARS
-}
rightBar : Model -> Html Msg
rightBar m =
    let
        moveUri =
            m.step
                |> Maybe.map (\s -> Position.sideToMove s.position)
                |> Maybe.withDefault PieceColor.white
                |> (\c ->
                        if c == PieceColor.white then
                            Images.pieceUri 'K'

                        else
                            Images.pieceUri 'k'
                   )

        btnFn =
            sidebarButton m.board.buttonSize

        top =
            [ btnFn Undo Images.undoUri False
            , btnFn Redo Images.redoUri False
            , btnFn Clear Images.clearUri False
            ]

        bot =
            [ ( moveUri, Moving )
            , ( Images.arrowsUri, Arrowing )
            , ( Images.circlesUri, Marking )
            ]
                |> List.map (\( text, mode ) -> btnFn (SelectMode mode) text (m.mode == mode))

        hr =
            Html.hr [ HtmlAttrs.style "margin" "20px 0px" ] []
    in
    top
        ++ (hr :: bot)
        |> Html.div []
        |> sidebar m [ HtmlAttrs.style "right" "5px" ]


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


sidebarButton : Float -> Msg -> String -> Bool -> Html Msg
sidebarButton size msg imageUri isSelected =
    let
        css =
            [ HtmlAttrs.style "display" "block"
            , HtmlAttrs.style "box-sizing" "border-box"
            , HtmlAttrs.style "justify-content" "center"
            , HtmlAttrs.style "align-items" "center"
            , HtmlAttrs.style "background-color" "transparent"
            , HtmlAttrs.style "border-width" "2px"
            , HtmlAttrs.style "margin" "10px 0px"
            , HtmlAttrs.style "width" (CssEx.px size)
            , HtmlAttrs.style "height" (CssEx.px size)
            , HtmlAttrs.style "border-radius" "50%"
            , HtmlAttrs.style "padding" "4px"
            , Html.Events.onClick msg
            , Html.Events.onDoubleClick NoOp
            ]

        css_ =
            if isSelected then
                HtmlAttrs.style "border-color" "orange" :: css

            else
                HtmlAttrs.style "border-color" "gray" :: css
    in
    Html.button
        css_
        [ Html.div
            [ HtmlAttrs.style "width" "80%"
            , HtmlAttrs.style "height" "80%"
            , HtmlAttrs.style "margin" "auto"
            , HtmlAttrs.style "background-image" imageUri
            , HtmlAttrs.style "background-size" "cover"
            ]
            []
        ]



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
        |> List.map (arrow_ m)
        |> (\xs -> Svg.svg attrs (defs :: xs))


arrow_ : Model -> Arrow -> Html Msg
arrow_ m arrow =
    let
        src =
            arrow.src
                |> Point.forSquare m
                |> Point.center

        dst =
            arrow.dst
                |> Point.forSquare m
                |> Point.center
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
                |> List.map
                    (Tuple.mapBoth
                        SquareRank.toString
                        SquareRank.toIndex
                    )
                |> List.map (Tuple.mapSecond (Point.forRankCoord m))
                |> List.map
                    (coord m
                        [ HtmlAttrs.style "justify-content" "flex-end"
                        , HtmlAttrs.style "align-items" "center"
                        ]
                    )

        files =
            SquareFile.all
                |> List.map (\f -> ( f, f ))
                |> List.map
                    (Tuple.mapBoth
                        SquareFile.toString
                        SquareFile.toIndex
                    )
                |> List.map (Tuple.mapSecond (Point.forFileCoord m))
                |> List.map
                    (coord m [ HtmlAttrs.style "justify-content" "center" ])
    in
    Html.div [] (ranks ++ files)


coord : Model -> List (Html.Attribute Msg) -> ( String, Point ) -> Html Msg
coord m attrs ( text, p ) =
    Html.div
        (attrs
            ++ [ HtmlAttrs.style "display" "flex"
               , HtmlAttrs.style "height" "12.5%"
               , HtmlAttrs.style "width" "12.5%"
               , HtmlAttrs.style "transform" (Point.translate m p)
               , HtmlAttrs.style "position" "absolute"
               , HtmlAttrs.style "top" "0"
               , HtmlAttrs.style "left" "0"
               , HtmlAttrs.style "font-size" "24px"
               ]
        )
        [ Html.div [ HtmlAttrs.style "margin" "15%" ] [ Html.text text ] ]


{-| HEADER
-}
header : Model -> Html Msg
header m =
    let
        answer =
            if String.isEmpty m.answer then
                ""

            else if m.showAnswer then
                m.answer

            else
                "[...]"

        cloze =
            if String.isEmpty answer then
                []

            else
                [ Html.hr [] []
                , Html.div
                    [ HtmlAttrs.style "color" "blue" ]
                    [ Html.text answer ]
                ]
    in
    Html.div
        [ HtmlAttrs.style "padding" "0.5em"
        , HtmlAttrs.style "white-space" "pre-wrap"
        , HtmlAttrs.style "font-size" "1.5em"
        ]
        (Html.text m.prompt :: cloze)


{-| LOG
-}
log : Model -> Html Msg
log m =
    let
        moves =
            Log.toLines m
                |> List.indexedMap logLine
                |> List.foldr (++) []
                |> Html.div
                    [ HtmlAttrs.style "display" "flex"
                    , HtmlAttrs.style "flex-flow" "row wrap"
                    ]
    in
    Html.div
        [ HtmlAttrs.style "height" "100%"
        , HtmlAttrs.style "display" "flex"
        , HtmlAttrs.style "flex-direction" "column"
        ]
        [ Html.div
            [ HtmlAttrs.id Log.logElementId
            , HtmlAttrs.style "flex" "1 0 auto"
            , HtmlAttrs.style "height" "1px"
            , HtmlAttrs.style "overflow-y" "scroll"
            ]
            [ moves ]
        , Html.div
            [ HtmlAttrs.style "flex" "0 1 auto" ]
            [ logButtons ]
        ]


logButton : List (Html.Attribute Msg) -> String -> Html Msg
logButton attrs text =
    let
        attrs_ =
            attrs
                ++ [ HtmlAttrs.style "background" "none"
                   , HtmlAttrs.style "border" "none"
                   , Html.Events.onDoubleClick NoOp
                   ]
    in
    Html.button
        attrs_
        [ Html.text text ]


logButtons : Html Msg
logButtons =
    Html.div
        [ HtmlAttrs.style "display" "flex"
        , HtmlAttrs.style "height" "3.5rem"
        , HtmlAttrs.style "border-top" "1px solid rgb(217, 217, 217)"
        ]
        [ logButton
            [ HtmlAttrs.style "flex" "1 1 20%"
            , Html.Events.onClick FirstMove
            ]
            "<<"
        , logButton
            [ HtmlAttrs.style "flex" "1 1 30%"
            , Html.Events.onClick PrevMove
            ]
            "<"
        , logButton
            [ HtmlAttrs.style "flex" "1 1 30%"
            , Html.Events.onClick NextMove
            ]
            ">"
        , logButton
            [ HtmlAttrs.style "flex" "1 1 20%"
            , Html.Events.onClick LastMove
            ]
            ">>"
        ]


logLine : Int -> LogLine -> List (Html Msg)
logLine idx line =
    [ Html.div
        [ HtmlAttrs.style "display" "flex"
        , HtmlAttrs.style "flex" "0 0 10%"
        , HtmlAttrs.style "box-sizing" "border-box"
        , HtmlAttrs.style "justify-content" "center"
        , HtmlAttrs.style "line-height" "2.07em"
        , HtmlAttrs.style "background-color" "#f7f6f5"
        , HtmlAttrs.style "color" "#b3b3b3"
        , HtmlAttrs.style "border-right" "1px solid #d9d9d9"
        ]
        [ idx + 1 |> String.fromInt |> Html.text ]
    , logItem line.white
    , logItem line.black
    ]


logItem : LogItem -> Html Msg
logItem item =
    let
        backgroundColor =
            if item.selected then
                "rgb(198, 221, 243)"

            else
                "transparent"

        attrs =
            [ HtmlAttrs.style "display" "flex"
            , HtmlAttrs.style "flex" "0 0 43%"
            , HtmlAttrs.style "box-sizing" "border-box"
            , HtmlAttrs.style "justify-content" "center"
            , HtmlAttrs.style "font-size" "1.185em"
            , HtmlAttrs.style "line-height" "2.07em"
            , HtmlAttrs.style "color" "#4d4d4d"
            , HtmlAttrs.style "background-color" backgroundColor
            , HtmlAttrs.style "border" "0px none"
            , Html.Events.onDoubleClick NoOp
            ]

        idAttrs =
            case item.stepIdx of
                Just idx ->
                    [ HtmlAttrs.id (Log.itemElementId idx) ]

                Nothing ->
                    []

        clickAttrs =
            case item.stepIdx of
                Just idx ->
                    [ HtmlAttrs.style "cursor" "pointer"
                    , Html.Events.onClick (SetMove idx)
                    ]

                Nothing ->
                    []
    in
    Html.button
        (attrs ++ idAttrs ++ clickAttrs)
        [ Html.text (Maybe.withDefault "" item.text) ]


{-| MARKS
-}
marks : Model -> Html Msg
marks m =
    Square.all
        |> List.map (mark_ m)
        |> List.foldr (++) []
        |> Html.div [ HtmlAttrs.style "pointer-events" "none" ]


mark_ : Model -> Square -> List (Html Msg)
mark_ m sq =
    let
        mark =
            Dict.get (Square.toInt sq) m.marks
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
            , HtmlAttrs.style "transform" (Point.translateSquare m sq)
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
                |> Maybe.map (selected_ m sq)
                |> Maybe.withDefault (Html.div [] [])


selected_ : Model -> Square -> String -> Html Msg
selected_ m sq color =
    let
        { x, y } =
            Point.forSquare m sq
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
                [ SvgAttrs.x (CssEx.px x)
                , SvgAttrs.y (CssEx.px y)
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
piece_ step m sq =
    case Position.pieceOn sq step.position of
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
                        , HtmlAttrs.style "transform" (Point.translateSquare m sq)
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
            , HtmlAttrs.style "box-sizing" "border-box"
            , HtmlAttrs.style "position" "absolute"
            , HtmlAttrs.style "top" "0"
            , HtmlAttrs.style "left" "0"
            , HtmlAttrs.style "transform" (Point.translateSquare m sq)
            , HtmlAttrs.style "border" "none"
            , Html.Events.onClick (ClickSquare sq)
            , Html.Events.onDoubleClick NoOp
            ]

        moveAttrs =
            case step.prevMove of
                Nothing ->
                    [ HtmlAttrs.style "opacity" "0" ]

                Just pm ->
                    if Move.from pm == sq || Move.to pm == sq then
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
