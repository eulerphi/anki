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
    makeGetViewportCmd vc



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
            ( vc, makeGetViewportCmd vc )



-- PRIVATE


makeGetViewportCmd : ViewContext msg -> Cmd msg
makeGetViewportCmd vc =
    Task.perform (vc.envelope << ViewportChanged) Browser.Dom.getViewport


updateOnSizeChanged : Browser.Dom.Viewport -> ViewContext msg -> ViewContext msg
updateOnSizeChanged { scene, viewport } vc =
    { vc
        | size =
            Size
                (max scene.width viewport.width)
                (max scene.height viewport.height)
    }
