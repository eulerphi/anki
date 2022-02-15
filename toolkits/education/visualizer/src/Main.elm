module Main exposing (..)

import Array exposing (Array)
import Browser
import Html
import Html.Styled as H
import Html.Styled.Attributes as HA
import Json.Encode as E
import Random
import Random.Array



-- INIT


type Msg
    = NoOp


type alias Model2 =
    { val : String }


shuffleString : String -> String
shuffleString str =
    str
        |> String.toList
        |> Array.fromList
        |> Random.Array.shuffle
        |> Random.step
        |> (\fn -> fn <| Random.initialSeed 45)
        |> Tuple.first
        |> Array.toList
        |> List.map String.fromChar
        |> List.foldr (++) ""


init : E.Value -> ( Model2, Cmd Msg )
init flags =
    ( { val = shuffleString "with" }, Cmd.none )



-- let
--     m =
--         flags |> Input.decode |> Model.fromInput
-- in
-- ( m, ViewContext.initCmd m.viewCtx )
-- SUBSCRIPTIONS


subscriptions : Model2 -> Sub Msg
subscriptions m =
    Sub.none


view : Model2 -> H.Html Msg
view m =
    H.div
        []
        [ H.text m.val ]



-- Sub.batch [ ViewContext.subscriptions m.viewCtx ]
-- MAIN


main : Program E.Value Model2 Msg
main =
    Browser.element
        { init = init
        , subscriptions = subscriptions
        , update = \msg m -> ( m, Cmd.none )
        , view = view >> H.toUnstyled
        }
