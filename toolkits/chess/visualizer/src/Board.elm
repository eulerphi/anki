module Board exposing (..)

import ViewContext exposing (ViewContext)


type alias Board =
    { boardSize : Float
    , buttonSize : Float
    , headerHeight : Float
    , panelHeight : Float
    , panelWidth : Float
    , squareSize : Float
    , style : String
    }


fromViewContext : Board -> ViewContext msg -> Board
fromViewContext _ vc =
    let
        headerHeight =
            0.1 * vc.size.height

        footerHeight =
            0.1 * vc.size.height

        minMarginWidths =
            80.0

        contentWidth =
            vc.size.width - (2 * minMarginWidths)

        boardSize =
            min
                (vc.size.height - headerHeight - footerHeight)
                (0.6 * contentWidth)

        squareSize =
            boardSize / 8

        panelWidth =
            min
                (0.4 * contentWidth - squareSize)
                (boardSize / 1.5)

        panelHeight =
            boardSize
    in
    { boardSize = boardSize
    , buttonSize = min squareSize minMarginWidths |> (*) 0.8
    , headerHeight = headerHeight
    , panelHeight = panelHeight
    , panelWidth = panelWidth
    , squareSize = squareSize
    , style = ""
    }


none : Board
none =
    { boardSize = 0
    , buttonSize = 0
    , headerHeight = 0
    , panelWidth = 0
    , panelHeight = 0
    , squareSize = 0
    , style = ""
    }
