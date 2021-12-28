module ViewContext exposing
    ( Msg
    , ViewContext
    , ViewContextLike
    , init
    , initCmd
    , subscriptions
    , update
    )

import Browser.Dom
import Browser.Events
import Size exposing (Size)
import Task


type alias ViewContext msg =
    { devicePixelRatio : Float
    , envelope : Msg -> msg
    , size : Size
    }


type alias ViewContextLike r =
    { r
        | devicePixelRatio : Float
        , size : Size
    }


type Msg
    = NoOp
    | ViewportChanged Browser.Dom.Viewport
    | WindowResized



-- INIT


init :
    { devicePixelRatio : Float
    , envelope : Msg -> msg
    }
    -> ViewContext msg
init input =
    ViewContext
        input.devicePixelRatio
        input.envelope
        Size.none


initCmd : ViewContext msg -> Cmd msg
initCmd vc =
    makeGetViewpointCmd vc



-- SUBSCRIPTIONS


subscriptions : ViewContext msg -> Sub msg
subscriptions vc =
    Browser.Events.onResize (\_ _ -> WindowResized |> vc.envelope)


update :
    Msg
    -> ViewContext msg
    -> ( ViewContext msg, Cmd msg )
update msg vc =
    case msg of
        NoOp ->
            ( vc, Cmd.none )

        ViewportChanged e ->
            ( vc |> updateOnSizeChanged e, Cmd.none )

        WindowResized ->
            ( vc, makeGetViewpointCmd vc )



-- PRIVATE


makeGetViewpointCmd : ViewContext msg -> Cmd msg
makeGetViewpointCmd vc =
    Task.perform (vc.envelope << ViewportChanged) Browser.Dom.getViewport


updateOnSizeChanged : Browser.Dom.Viewport -> ViewContext msg -> ViewContext msg
updateOnSizeChanged { viewport } vc =
    { vc | size = Size viewport.width viewport.height }
