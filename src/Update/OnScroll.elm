module Update.OnScroll exposing (handle)

import Utils exposing (activeIndexFrom)
import Types exposing (Model, Msg(..))

handle : Float -> Model -> (Int -> Cmd Msg) -> (Model, Cmd Msg)
handle y model setActiveBgCmd =
    let
        bottom =
            y + model.viewportH
                --|> Debug.log "activeIndexFrom -> bottom"

        idx =
            activeIndexFrom bottom model.videoMarkers (List.length model.videoSources)
                |> Debug.log "activeIndexFrom → idx"

        swapCmd =
            if idx /= model.activeBgIndex then
                setActiveBgCmd idx
            else
                Cmd.none

    in
    ( { model | scrollY = y, activeBgIndex = idx }, swapCmd )
