module Update.OnScroll exposing (handle)

import Utils exposing (activeIndexFrom)
import Types exposing (Model, Msg(..))
import Constants exposing (numVideoBgs)

handle : Float -> Model -> (Int -> Cmd Msg) -> (Model, Cmd Msg)
handle y model setActiveBgCmd =
    let
        bottom =
            y + model.viewportH

        idx =
            activeIndexFrom bottom model.videoMarkers numVideoBgs

        swapCmd =
            if idx /= model.activeBgIndex then
                setActiveBgCmd idx
            else
                Cmd.none

    in
    ( { model | scrollY = y, activeBgIndex = idx }, swapCmd )
