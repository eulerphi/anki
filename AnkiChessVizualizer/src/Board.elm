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
            boardSize

        squareSize =
            boardSize / 8
    in
    { boardSize = boardSize
    , buttonSize = 0.8 * squareSize
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
