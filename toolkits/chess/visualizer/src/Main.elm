module Main exposing (..)

import Browser
import Input
import Json.Encode as E
import Model
import Types exposing (..)
import Update
import View
import ViewContext



-- INIT


init : E.Value -> ( Model2, Cmd Msg )
init flags =
    let
        m =
            flags |> Input.decode |> Model.fromInput
    in
    ( m, ViewContext.initCmd m.viewCtx )



-- SUBSCRIPTIONS


subscriptions : Model2 -> Sub Msg
subscriptions m =
    Sub.batch [ ViewContext.subscriptions m.viewCtx ]



-- MAIN


main : Program E.Value Model2 Msg
main =
    Browser.element
        { init = init
        , subscriptions = subscriptions
        , update = Update.update
        , view = View.view << Model.fromModel2
        }
