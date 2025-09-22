module Update.OnScroll exposing (handle)

import Utils exposing (activeIndexFrom)
import Types exposing (Model, Msg(..))

handle : Float -> Model -> (Model, Cmd Msg)
handle y model =
    let
        bottom =
            y + model.viewportH
                |> Debug.log "activeIndexFrom -> bottom"

        idx =
            activeIndexFrom bottom model.videoMarkers (List.length model.videoSources)
                |> Debug.log "activeIndexFrom → idx"

    in
    ( { model | activeBgIndex = idx }, Cmd.none )
