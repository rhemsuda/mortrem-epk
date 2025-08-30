module Update.OnScroll exposing (handle)

import Types exposing (Model, Msg(..))

handle : Float -> Model -> (Model, Cmd Msg)
handle y model =
    ( { model | scrollY = y }, Cmd.none )
