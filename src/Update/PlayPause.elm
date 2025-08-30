module Update.PlayPause exposing (handle)

import Types exposing (Model, Msg(..), Song)

handle : Song -> Model -> ((String, String) -> Cmd Msg) -> (String -> Cmd Msg) -> (Model, Cmd Msg)
handle currentSong model playAudio pauseAudio =
    let
        cmd =
            if model.isPlaying then
                pauseAudio "audioPlayer"
            else
                playAudio ("audioPlayer", currentSong.src)
    in
        ( { model | isPlaying = not model.isPlaying, error = Nothing }, cmd )
