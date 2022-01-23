module ListEx exposing (..)


popBack : List a -> ( Maybe a, List a )
popBack xs =
    let
        sx =
            List.reverse xs

        tail =
            List.tail sx |> Maybe.withDefault []
    in
    ( List.head sx, List.reverse tail )
