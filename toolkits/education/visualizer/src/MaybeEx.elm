module MaybeEx exposing (..)


hasValue : Maybe a -> Bool
hasValue m =
    case m of
        Just _ ->
            True

        Nothing ->
            False
