module MathEx exposing (..)


minmax : number -> number -> number -> number
minmax minVal maxVal val =
    max minVal
        (min val maxVal)


roundNear : Float -> Float -> Float
roundNear unit value =
    [ -1, 0, 1 ]
        |> List.map ((+) (value / unit))
        |> List.map (toFloat << round)
        |> List.map (\x -> x * unit)
        |> List.map (\x -> ( x, abs <| x - value ))
        |> List.sortBy Tuple.second
        |> List.head
        |> Maybe.map Tuple.first
        |> Maybe.withDefault value


roundNearInt : Int -> Int -> Int
roundNearInt unit value =
    [ -1, 0, 1 ]
        |> List.map ((+) (value // unit))
        |> List.map (\x -> x * unit)
        |> List.map (\x -> ( x, abs <| x - value ))
        |> List.sortBy Tuple.second
        |> List.head
        |> Maybe.map Tuple.first
        |> Maybe.withDefault value
