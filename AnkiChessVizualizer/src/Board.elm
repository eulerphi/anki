module Board exposing (Board, Mark(..), ViewInput, fromViewContext, nextMark, none, view)

import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes as HtmlAttrs
import Html.Events
import Move
import Piece exposing (Piece)
import PieceColor exposing (PieceColor)
import Position exposing (Position)
import Square exposing (Square)
import SquareFile exposing (SquareFile)
import SquareRank
import Step exposing (MoveEx, Step)
import StringEx
import ViewContext exposing (ViewContext)


type alias Board =
    { boardSize : Float
    , headerHeight : Float
    , panelHeight : Float
    , panelWidth : Float
    , squareSize : Float
    , style : String
    }


type Mark
    = NoMark
    | Green
    | Red


nextMark : Mark -> Mark
nextMark current =
    case current of
        NoMark ->
            Green

        Green ->
            Red

        Red ->
            NoMark


type alias Pos =
    { rank : Int
    , file : Int
    }


fromViewContext : Board -> ViewContext msg -> Board
fromViewContext board vc =
    let
        headerHeight =
            0.1 * vc.size.height

        footerHeight =
            0.2 * vc.size.height

        minMarginWidths =
            100.0

        contentWidth =
            vc.size.width - minMarginWidths

        boardSize =
            min
                (vc.size.height - headerHeight - footerHeight)
                (0.6 * contentWidth)

        panelWidth =
            min
                (0.4 * contentWidth)
                (boardSize / 2)

        panelHeight =
            boardSize / 2

        squareSize =
            boardSize / 8
    in
    { board
        | boardSize = boardSize
        , headerHeight = headerHeight
        , panelHeight = panelHeight
        , panelWidth = panelWidth
        , squareSize = squareSize
    }


none : Board
none =
    { boardSize = 0
    , headerHeight = 0
    , panelWidth = 0
    , panelHeight = 0
    , squareSize = 0
    , style = ""
    }


type alias ViewInput msg =
    { board : Board
    , clickSquareMsg : Square -> msg
    , marks : Dict Int Mark
    , playerColor : PieceColor
    }


view : ViewInput msg -> Maybe Step -> Html msg
view input position =
    let
        board =
            input.board

        whiteToPlay =
            input.playerColor == PieceColor.white
    in
    case position of
        Nothing ->
            Html.div [] []

        Just s ->
            Html.div
                [ HtmlAttrs.style "width" (StringEx.pixelLength board.boardSize)
                , HtmlAttrs.style "height" (StringEx.pixelLength board.boardSize)
                , HtmlAttrs.style "position" "absolute"
                , HtmlAttrs.style "top" "0"
                , HtmlAttrs.style "left" "0"
                , HtmlAttrs.style "background-size" "cover"
                , HtmlAttrs.style "background-image" (boardSvgUri board.style)
                , HtmlAttrs.style "background-repeat" "no-repeat"
                ]
                [ Html.div
                    []
                    (viewCoords board)
                , Html.div
                    []
                    [ viewPlayerIndicator board whiteToPlay ]
                , Html.div
                    []
                    (viewSquares input s.prevMove)
                , Html.div
                    []
                    (viewPieces input.board s.position)
                ]


viewSquares : ViewInput msg -> Maybe MoveEx -> List (Html msg)
viewSquares input prevMove =
    Square.all
        |> List.map (viewSquare input prevMove)


viewMark : ViewInput msg -> Mark -> List (Html msg)
viewMark input mark =
    let
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
            [ HtmlAttrs.style "pointer-events" "none"
            , HtmlAttrs.style "border-radius" "50%"
            , HtmlAttrs.style "border" ("4px solid " ++ color)
            , HtmlAttrs.style "height" "90%"
            , HtmlAttrs.style "width" "90%"
            ]
            []
        ]


viewSquare : ViewInput msg -> Maybe MoveEx -> Square -> Html msg
viewSquare input prevMove square =
    let
        moveCss =
            case prevMove of
                Nothing ->
                    []

                Just pm ->
                    if Move.from pm.move == square || Move.to pm.move == square then
                        [ HtmlAttrs.style "background-color" "yellow"
                        , HtmlAttrs.style "opacity" "0.3"
                        ]

                    else
                        []

        markContent =
            Dict.get (Square.toInt square) input.marks
                |> Maybe.withDefault NoMark
                |> viewMark input
    in
    Html.div
        ([ HtmlAttrs.style "height" "12.5%"
         , HtmlAttrs.style "width" "12.5%"
         , HtmlAttrs.style "transform" (square |> toPos |> translate input.board)
         , HtmlAttrs.style "position" "absolute"
         , HtmlAttrs.style "top" "0"
         , HtmlAttrs.style "left" "0"
         , HtmlAttrs.style "display" "flex"
         , HtmlAttrs.style "justify-content" "center"
         , HtmlAttrs.style "align-items" "center"
         , Html.Events.onClick (input.clickSquareMsg square)
         ]
            ++ moveCss
        )
        markContent


viewPieces : Board -> Position -> List (Html msg)
viewPieces board position =
    Square.all
        |> List.map (\s -> viewPiece board s (Position.pieceOn s position))
        |> List.foldr (++) []


toPos : Square -> Pos
toPos square =
    { rank = Square.rank square |> SquareRank.toIndex |> (+) 1
    , file = Square.file square |> SquareFile.toIndex |> (+) 1
    }


viewPiece : Board -> Square -> Maybe Piece -> List (Html msg)
viewPiece board square piece =
    case piece of
        Nothing ->
            []

        Just p ->
            let
                div =
                    Html.div
                        [ HtmlAttrs.style "background-image" (p |> Piece.toChar |> pieceSvgUri)
                        , HtmlAttrs.style "background-repeat" "no-repeat"
                        , HtmlAttrs.style "background-size" "cover"
                        , HtmlAttrs.style "pointer-events" "none"
                        , HtmlAttrs.style "height" "12.5%"
                        , HtmlAttrs.style "width" "12.5%"
                        , HtmlAttrs.style "transform" (translate board (toPos square))
                        , HtmlAttrs.style "position" "absolute"
                        , HtmlAttrs.style "top" "0"
                        , HtmlAttrs.style "left" "0"
                        ]
                        []
            in
            [ div ]


viewPlayerIndicator : Board -> Bool -> Html msg
viewPlayerIndicator board whiteToPlay =
    Html.div
        [ HtmlAttrs.style "height" "12.5%"
        , HtmlAttrs.style "width" "12.5%"
        , HtmlAttrs.style "transform" (translate board { rank = 1, file = 9 })
        , HtmlAttrs.style "background-image" (playerIndicatorSvgUri whiteToPlay)
        , HtmlAttrs.style "background-repeat" "no-repeat"
        , HtmlAttrs.style "background-position" "center"
        , HtmlAttrs.style "position" "absolute"
        , HtmlAttrs.style "top" "0"
        , HtmlAttrs.style "left" "0"
        , HtmlAttrs.style "justify-content" "center"
        , HtmlAttrs.style "align-items" "center"
        , HtmlAttrs.style "display" "flex"
        , HtmlAttrs.style "font-size" "24px"
        ]
        []


viewCoord : Board -> ( Pos, String ) -> Html msg
viewCoord board ( pos, text ) =
    Html.div
        [ HtmlAttrs.style "height" "12.5%"
        , HtmlAttrs.style "width" "12.5%"
        , HtmlAttrs.style "transform" (translate board pos)
        , HtmlAttrs.style "position" "absolute"
        , HtmlAttrs.style "top" "0"
        , HtmlAttrs.style "left" "0"
        , HtmlAttrs.style "justify-content" "center"
        , HtmlAttrs.style "align-items" "center"
        , HtmlAttrs.style "display" "flex"
        , HtmlAttrs.style "font-size" "32px"
        ]
        [ Html.text text ]


viewCoords : Board -> List (Html msg)
viewCoords board =
    (rankCoords ++ fileCoords)
        |> List.map (viewCoord board)


fileCoords : List ( Pos, String )
fileCoords =
    let
        start =
            Char.toCode 'a'
    in
    List.range 1 8
        |> List.map (\f -> ( Pos 0 f, start + f - 1 |> Char.fromCode |> String.fromChar ))


rankCoords : List ( Pos, String )
rankCoords =
    List.range 1 8
        |> List.map (\r -> ( Pos r 0, String.fromInt r ))


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


boardSvgUri : String -> String
boardSvgUri name =
    case name of
        "blue" ->
            "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+CjxnIGlkPSJicm93bi1ib2FyZCI+CjxnIGlkPSJMaWdodCIgZmlsbD0iI2RlZTNlNiI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIi8+CjwvZz4KPGcgaWQ9IkZyYW1lIiBmaWxsPSJub25lIj4KPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiLz4KPC9nPgo8ZyBpZD0iRGFyayIgZmlsbD0iIzhjYTJhZCI+CjxnIGlkPSJyYXoiPgo8ZyBpZD0iZHZhIj4KPGcgaWQ9InRyaSI+CjxyZWN0IHg9IjEwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiLz4KPHJlY3QgeD0iMzAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPgo8cmVjdCB4PSI1MDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIi8+CjxyZWN0IHg9IjcwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiLz4KPC9nPgo8dXNlIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDAsMTAwKSIgeGxpbms6aHJlZj0iI3RyaSIvPgo8L2c+Cjx1c2UgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwyMDApIiB4bGluazpocmVmPSIjZHZhIi8+CjwvZz4KPHVzZSB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDQwMCkiIHhsaW5rOmhyZWY9IiNyYXoiLz4KPC9nPgo8L2c+Cjwvc3ZnPg==')"

        "green" ->
            "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgOCA4IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgo8ZyBpZD0iYSI+CiAgPGcgaWQ9ImIiPgogICAgPGcgaWQ9ImMiPgogICAgICA8ZyBpZD0iZCI+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZmZkZCIgaWQ9ImUiLz4KICAgICAgICA8dXNlIHg9IjEiIHk9IjEiIGhyZWY9IiNlIiB4OmhyZWY9IiNlIi8+CiAgICAgICAgPHJlY3QgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzg2YTY2NiIgaWQ9ImYiLz4KICAgICAgICA8dXNlIHg9IjEiIHk9Ii0xIiBocmVmPSIjZiIgeDpocmVmPSIjZiIvPgogICAgICA8L2c+CiAgICAgIDx1c2UgeD0iMiIgaHJlZj0iI2QiIHg6aHJlZj0iI2QiLz4KICAgIDwvZz4KICAgIDx1c2UgeD0iNCIgaHJlZj0iI2MiIHg6aHJlZj0iI2MiLz4KICA8L2c+CiAgPHVzZSB5PSIyIiBocmVmPSIjYiIgeDpocmVmPSIjYiIvPgo8L2c+Cjx1c2UgeT0iNCIgaHJlZj0iI2EiIHg6aHJlZj0iI2EiLz4KPC9zdmc+)"

        -- gray
        _ ->
            "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgOCA4IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgo8ZyBpZD0iYSI+CiAgPGcgaWQ9ImIiPgogICAgPGcgaWQ9ImMiPgogICAgICA8ZyBpZD0iZCI+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiIGlkPSJlIi8+CiAgICAgICAgPHVzZSB4PSIxIiB5PSIxIiBocmVmPSIjZSIgeDpocmVmPSIjZSIvPgogICAgICAgIDxyZWN0IHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImxpZ2h0Z3JheSIgaWQ9ImYiLz4KICAgICAgICA8dXNlIHg9IjEiIHk9Ii0xIiBocmVmPSIjZiIgeDpocmVmPSIjZiIvPgogICAgICA8L2c+CiAgICAgIDx1c2UgeD0iMiIgaHJlZj0iI2QiIHg6aHJlZj0iI2QiLz4KICAgIDwvZz4KICAgIDx1c2UgeD0iNCIgaHJlZj0iI2MiIHg6aHJlZj0iI2MiLz4KICA8L2c+CiAgPHVzZSB5PSIyIiBocmVmPSIjYiIgeDpocmVmPSIjYiIvPgo8L2c+Cjx1c2UgeT0iNCIgaHJlZj0iI2EiIHg6aHJlZj0iI2EiLz4KPC9zdmc+)"


{-| Uppercase is white, lowercase is black
-}
pieceSvgUri : Char -> String
pieceSvgUri code =
    case code of
        'b' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGZpbGw9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNOSAzNmMzLjM5LS45NyAxMC4xMS40MyAxMy41LTIgMy4zOSAyLjQzIDEwLjExIDEuMDMgMTMuNSAyIDAgMCAxLjY1LjU0IDMgMi0uNjguOTctMS42NS45OS0zIC41LTMuMzktLjk3LTEwLjExLjQ2LTEzLjUtMS0zLjM5IDEuNDYtMTAuMTEuMDMtMTMuNSAxLTEuMzU0LjQ5LTIuMzIzLjQ3LTMtLjUgMS4zNTQtMS45NCAzLTIgMy0yeiIvPjxwYXRoIGQ9Ik0xNSAzMmMyLjUgMi41IDEyLjUgMi41IDE1IDAgLjUtMS41IDAtMiAwLTIgMC0yLjUtMi41LTQtMi41LTQgNS41LTEuNSA2LTExLjUtNS0xNS41LTExIDQtMTAuNSAxNC01IDE1LjUgMCAwLTIuNSAxLjUtMi41IDQgMCAwLS41LjUgMCAyeiIvPjxwYXRoIGQ9Ik0yNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAxIDEgNSAweiIvPjwvZz48cGF0aCBkPSJNMTcuNSAyNmgxME0xNSAzMGgxNW0tNy41LTE0LjV2NU0yMCAxOGg1IiBzdHJva2U9IiNlY2VjZWMiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48L2c+PC9zdmc+')"

        'k' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMi41IDExLjYzVjYiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjIuNSAyNXM0LjUtNy41IDMtMTAuNWMwIDAtMS0yLjUtMy0yLjVzLTMgMi41LTMgMi41Yy0xLjUgMyAzIDEwLjUgMyAxMC41IiBmaWxsPSIjMDAwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0xMS41IDM3YzUuNSAzLjUgMTUuNSAzLjUgMjEgMHYtN3M5LTQuNSA2LTEwLjVjLTQtNi41LTEzLjUtMy41LTE2IDRWMjd2LTMuNWMtMy41LTcuNS0xMy0xMC41LTE2LTQtMyA2IDUgMTAgNSAxMFYzN3oiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMjAgOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTMyIDI5LjVzOC41LTQgNi4wMy05LjY1QzM0LjE1IDE0IDI1IDE4IDIyLjUgMjQuNWwuMDEgMi4xLS4wMS0yLjFDMjAgMTggOS45MDYgMTQgNi45OTcgMTkuODVjLTIuNDk3IDUuNjUgNC44NTMgOSA0Ljg1MyA5IiBzdHJva2U9IiNlY2VjZWMiLz48cGF0aCBkPSJNMTEuNSAzMGM1LjUtMyAxNS41LTMgMjEgMG0tMjEgMy41YzUuNS0zIDE1LjUtMyAyMSAwbS0yMSAzLjVjNS41LTMgMTUuNS0zIDIxIDAiIHN0cm9rZT0iI2VjZWNlYyIvPjwvZz48L3N2Zz4=')"

        'n' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjZWNlY2VjIiBzdHJva2U9IiNlY2VjZWMiLz48cGF0aCBkPSJNMjQuNTUgMTAuNGwtLjQ1IDEuNDUuNS4xNWMzLjE1IDEgNS42NSAyLjQ5IDcuOSA2Ljc1UzM1Ljc1IDI5LjA2IDM1LjI1IDM5bC0uMDUuNWgyLjI1bC4wNS0uNWMuNS0xMC4wNi0uODgtMTYuODUtMy4yNS0yMS4zNC0yLjM3LTQuNDktNS43OS02LjY0LTkuMTktNy4xNmwtLjUxLS4xeiIgZmlsbD0iI2VjZWNlYyIgc3Ryb2tlPSJub25lIi8+PC9nPjwvc3ZnPg==')"

        'p' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')"

        'q' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIHN0cm9rZT0ibm9uZSI+PGNpcmNsZSBjeD0iNiIgY3k9IjEyIiByPSIyLjc1Ii8+PGNpcmNsZSBjeD0iMTQiIGN5PSI5IiByPSIyLjc1Ii8+PGNpcmNsZSBjeD0iMjIuNSIgY3k9IjgiIHI9IjIuNzUiLz48Y2lyY2xlIGN4PSIzMSIgY3k9IjkiIHI9IjIuNzUiLz48Y2lyY2xlIGN4PSIzOSIgY3k9IjEyIiByPSIyLjc1Ii8+PC9nPjxwYXRoIGQ9Ik05IDI2YzguNS0xLjUgMjEtMS41IDI3IDBsMi41LTEyLjVMMzEgMjVsLS4zLTE0LjEtNS4yIDEzLjYtMy0xNC41LTMgMTQuNS01LjItMTMuNkwxNCAyNSA2LjUgMTMuNSA5IDI2eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNOSAyNmMwIDIgMS41IDIgMi41IDQgMSAxLjUgMSAxIC41IDMuNS0xLjUgMS0xLjUgMi41LTEuNSAyLjUtMS41IDEuNS41IDIuNS41IDIuNSA2LjUgMSAxNi41IDEgMjMgMCAwIDAgMS41LTEgMC0yLjUgMCAwIC41LTEuNS0xLTIuNS0uNS0yLjUtLjUtMiAuNS0zLjUgMS0yIDIuNS0yIDIuNS00LTguNS0xLjUtMTguNS0xLjUtMjcgMHoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTExIDM4LjVhMzUgMzUgMSAwIDAgMjMgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMTEgMjlhMzUgMzUgMSAwIDEgMjMgMG0tMjEuNSAyLjVoMjBtLTIxIDNhMzUgMzUgMSAwIDAgMjIgMG0tMjMgM2EzNSAzNSAxIDAgMCAyNCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2VjZWMiLz48L2c+PC9zdmc+')"

        'r' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik05IDM5aDI3di0zSDl2M3ptMy41LTdsMS41LTIuNWgxN2wxLjUgMi41aC0yMHptLS41IDR2LTRoMjF2NEgxMnoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTE0IDI5LjV2LTEzaDE3djEzSDE0eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMTQgMTYuNUwxMSAxNGgyM2wtMyAyLjVIMTR6TTExIDE0VjloNHYyaDVWOWg1djJoNVY5aDR2NUgxMXoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTEyIDM1LjVoMjFtLTIwLTRoMTltLTE4LTJoMTdtLTE3LTEzaDE3TTExIDE0aDIzIiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2VjZWMiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjwvZz48L3N2Zz4=')"

        'B' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGZpbGw9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNOSAzNmMzLjM5LS45NyAxMC4xMS40MyAxMy41LTIgMy4zOSAyLjQzIDEwLjExIDEuMDMgMTMuNSAyIDAgMCAxLjY1LjU0IDMgMi0uNjguOTctMS42NS45OS0zIC41LTMuMzktLjk3LTEwLjExLjQ2LTEzLjUtMS0zLjM5IDEuNDYtMTAuMTEuMDMtMTMuNSAxLTEuMzU0LjQ5LTIuMzIzLjQ3LTMtLjUgMS4zNTQtMS45NCAzLTIgMy0yeiIvPjxwYXRoIGQ9Ik0xNSAzMmMyLjUgMi41IDEyLjUgMi41IDE1IDAgLjUtMS41IDAtMiAwLTIgMC0yLjUtMi41LTQtMi41LTQgNS41LTEuNSA2LTExLjUtNS0xNS41LTExIDQtMTAuNSAxNC01IDE1LjUgMCAwLTIuNSAxLjUtMi41IDQgMCAwLS41LjUgMCAyeiIvPjxwYXRoIGQ9Ik0yNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAxIDEgNSAweiIvPjwvZz48cGF0aCBkPSJNMTcuNSAyNmgxME0xNSAzMGgxNW0tNy41LTE0LjV2NU0yMCAxOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PC9nPjwvc3ZnPg==')"

        'K' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMi41IDExLjYzVjZNMjAgOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTIyLjUgMjVzNC41LTcuNSAzLTEwLjVjMCAwLTEtMi41LTMtMi41cy0zIDIuNS0zIDIuNWMtMS41IDMgMyAxMC41IDMgMTAuNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMTEuNSAzN2M1LjUgMy41IDE1LjUgMy41IDIxIDB2LTdzOS00LjUgNi0xMC41Yy00LTYuNS0xMy41LTMuNS0xNiA0VjI3di0zLjVjLTMuNS03LjUtMTMtMTAuNS0xNi00LTMgNiA1IDEwIDUgMTBWMzd6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExLjUgMzBjNS41LTMgMTUuNS0zIDIxIDBtLTIxIDMuNWM1LjUtMyAxNS41LTMgMjEgMG0tMjEgMy41YzUuNS0zIDE1LjUtMyAyMSAwIi8+PC9nPjwvc3ZnPg==')"

        'N' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==')"

        'P' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')"

        'Q' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04IDEyYTIgMiAwIDEgMS00IDAgMiAyIDAgMSAxIDQgMHptMTYuNS00LjVhMiAyIDAgMSAxLTQgMCAyIDIgMCAxIDEgNCAwek00MSAxMmEyIDIgMCAxIDEtNCAwIDIgMiAwIDEgMSA0IDB6TTE2IDguNWEyIDIgMCAxIDEtNCAwIDIgMiAwIDEgMSA0IDB6TTMzIDlhMiAyIDAgMSAxLTQgMCAyIDIgMCAxIDEgNCAweiIvPjxwYXRoIGQ9Ik05IDI2YzguNS0xLjUgMjEtMS41IDI3IDBsMi0xMi03IDExVjExbC01LjUgMTMuNS0zLTE1LTMgMTUtNS41LTE0VjI1TDcgMTRsMiAxMnoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTkgMjZjMCAyIDEuNSAyIDIuNSA0IDEgMS41IDEgMSAuNSAzLjUtMS41IDEtMS41IDIuNS0xLjUgMi41LTEuNSAxLjUuNSAyLjUuNSAyLjUgNi41IDEgMTYuNSAxIDIzIDAgMCAwIDEuNS0xIDAtMi41IDAgMCAuNS0xLjUtMS0yLjUtLjUtMi41LS41LTIgLjUtMy41IDEtMiAyLjUtMiAyLjUtNC04LjUtMS41LTE4LjUtMS41LTI3IDB6IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0xMS41IDMwYzMuNS0xIDE4LjUtMSAyMiAwTTEyIDMzLjVjNi0xIDE1LTEgMjEgMCIgZmlsbD0ibm9uZSIvPjwvZz48L3N2Zz4=')"

        'R' ->
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik05IDM5aDI3di0zSDl2M3ptMy0zdi00aDIxdjRIMTJ6bS0xLTIyVjloNHYyaDVWOWg1djJoNVY5aDR2NSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMzQgMTRsLTMgM0gxNGwtMy0zIi8+PHBhdGggZD0iTTMxIDE3djEyLjVIMTRWMTciIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTMxIDI5LjVsMS41IDIuNWgtMjBsMS41LTIuNSIvPjxwYXRoIGQ9Ik0xMSAxNGgyMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjwvZz48L3N2Zz4=')"

        _ ->
            ""


playerIndicatorSvgUri : Bool -> String
playerIndicatorSvgUri whiteToPlay =
    if whiteToPlay then
        "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjQ1IgogICBoZWlnaHQ9IjQ1IgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxnPgogICAgPGNpcmNsZQogICAgICAgc3R5bGU9ImZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lIgogICAgICAgY3g9IjIyLjUiCiAgICAgICBjeT0iMjIuNSIKICAgICAgIHI9IjE3LjUiIC8+CiAgPC9nPgo8L3N2Zz4K)"

    else
        "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjQ1IgogICBoZWlnaHQ9IjQ1IgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxnPgogICAgPGNpcmNsZQogICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lIgogICAgICAgY3g9IjIyLjUiCiAgICAgICBjeT0iMjIuNSIKICAgICAgIHI9IjE3LjUiIC8+CiAgPC9nPgo8L3N2Zz4K)"
