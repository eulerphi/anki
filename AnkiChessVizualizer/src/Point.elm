module Point exposing (..)

import CssEx
import PieceColor
import Square exposing (Square)
import SquareFile
import SquareRank
import Types exposing (..)


forFileCoord : Model -> Int -> Point
forFileCoord m file =
    let
        file_ =
            if m.playerColor == PieceColor.white then
                file

            else
                7 - file
    in
    Point (toFloat file_) 8


center : Point -> Point
center p =
    { x = p.x + 0.5, y = p.y + 0.5 }


forSquare : Model -> Square -> Point
forSquare m sq =
    let
        ( rank, file ) =
            ( Square.rank sq |> SquareRank.toIndex
            , Square.file sq |> SquareFile.toIndex
            )

        xy =
            if m.playerColor == PieceColor.white then
                ( file, 7 - rank )

            else
                ( 7 - file, rank )
    in
    xy
        |> Tuple.mapBoth toFloat toFloat
        |> (\( x, y ) -> Point x y)


forRankCoord : Model -> Int -> Point
forRankCoord m rank =
    let
        rank_ =
            if m.playerColor == PieceColor.white then
                7 - rank

            else
                rank
    in
    Point -1 (toFloat rank_)


translate : Model -> Point -> String
translate m p =
    String.join
        ""
        [ "translate("
        , CssEx.px (p.x * m.board.squareSize)
        , ", "
        , CssEx.px (p.y * m.board.squareSize)
        , ")"
        ]


translateSquare : Model -> Square -> String
translateSquare m sq =
    forSquare m sq |> translate m
