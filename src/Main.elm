port module Main exposing (main)

import Browser
import Html exposing (Html, div, h1, h2, p, text, img, audio, canvas, button, span)
import Html.Attributes exposing (class, style, src, alt, id, width, height, preload)
import Html.Events exposing (on, onClick)
import Json.Decode as Decode

-- PORTS
port playAudio : (String, String) -> Cmd msg
port pauseAudio : String -> Cmd msg
port seekAudio : (String, Float) -> Cmd msg
port timeUpdate : ((Float, Float) -> msg) -> Sub msg
port songEnded : (() -> msg) -> Sub msg
port updateWaveform : Bool -> Cmd msg
port audioError : (String -> msg) -> Sub msg
port onScroll : (Float -> msg) -> Sub msg
port frequencyData : (List Float -> msg) -> Sub msg
port drawWaveform : List Float -> Cmd msg
port changeVideo : String -> Cmd msg
port videoSwitch : (Bool -> msg) -> Sub msg

-- MODEL
type alias Song =
    { title : String
    , src : String
    , released : Bool
    }

type alias Model =
    { scrollY : Float
    , currentSongIndex : Int
    , isPlaying : Bool
    , currentTime : Float
    , duration : Float
    , songs : List Song
    , error : Maybe String
    , barHeights : List Float
    , currentVideo : String
    }

songs : List Song
songs =
    [ { title = "1. Kingdom Come", src = "/audio/mortrem-kingdom-come.mp3", released = False }
    , { title = "2. Nonfiction", src = "/audio/mortrem-nonfiction.mp3", released = True }
    , { title = "3. Vanity Box", src = "/audio/mortrem-vanitybox.mp3", released = False }
    ]

init : () -> ( Model, Cmd Msg )
init _ =
    ( { scrollY = 0
      , currentSongIndex = 0
      , isPlaying = False
      , currentTime = 0
      , duration = 0
      , songs = songs
      , error = Nothing
      , barHeights = List.repeat 60 25.0
      , currentVideo = "/videos/epk-banner-fixed.mp4"
      }
    , Cmd.none
    )

-- UPDATE
type Msg
    = OnScroll Float
    | PlayPause
    | NextSong
    | PreviousSong
    | TimeUpdate Float Float
    | SongEnded
    | Seek Float
    | SeekProgress Float
    | AudioError String
    | FrequencyData (List Float)
    | VideoSwitch Bool

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        currentSong =
            List.drop model.currentSongIndex model.songs
                |> List.head
                |> Maybe.withDefault { title = "", src = "", released = False }
    in
    case msg of
        OnScroll y -> ( { model | scrollY = y }, Cmd.none )
        PlayPause ->
            let
                cmd =
                    if model.isPlaying then
                        pauseAudio "audioPlayer"
                    else
                        playAudio ( "audioPlayer", currentSong.src )
            in
            ( { model | isPlaying = not model.isPlaying, error = Nothing }, cmd )
        NextSong ->
            let
                nextIndex =
                    if model.currentSongIndex + 1 < List.length model.songs then
                        model.currentSongIndex + 1
                    else
                        0
                nextSong =
                    List.drop nextIndex model.songs
                        |> List.head
                        |> Maybe.withDefault { title = "", src = "", released = False }
            in
            ( { model | currentSongIndex = nextIndex, isPlaying = True, currentTime = 0, error = Nothing }
            , Cmd.batch [ playAudio ( "audioPlayer", nextSong.src ), updateWaveform True ]
            )
        PreviousSong ->
            let
                prevIndex =
                    if model.currentSongIndex - 1 >= 0 then
                        model.currentSongIndex - 1
                    else
                        List.length model.songs - 1
                prevSong =
                    List.drop prevIndex model.songs
                        |> List.head
                        |> Maybe.withDefault { title = "", src = "", released = False }
            in
            ( { model | currentSongIndex = prevIndex, isPlaying = True, currentTime = 0, error = Nothing }
            , Cmd.batch [ playAudio ( "audioPlayer", prevSong.src ), updateWaveform True ]
            )
        TimeUpdate current duration ->
            ( { model | currentTime = current, duration = duration }, Cmd.none )
        SongEnded ->
            update NextSong model
        Seek time ->
            ( { model | currentTime = time, error = Nothing }, seekAudio ( "audioPlayer", time ) )
        SeekProgress progress ->
            let
                seekTime = progress * model.duration
            in
            ( { model | currentTime = seekTime, error = Nothing }, seekAudio ( "audioPlayer", seekTime ) )
        AudioError error ->
            ( { model | isPlaying = False, error = Just ("Failed to play '" ++ currentSong.title ++ "': " ++ error) }
            , Cmd.batch [ updateWaveform False ]
            )
        FrequencyData freqData ->
            let
                -- Map 100 Hz–10 kHz to 60 bars
                minFreq = 100
                maxFreq = 10000
                sampleRate = 44100
                maxFreqNyquist = sampleRate / 2 -- 22050 Hz
                bins = 1024 -- fftSize / 2
                freqPerBin = maxFreqNyquist / bins -- ~21.5 Hz
                minBin = minFreq / freqPerBin -- ~4.65
                maxBin = maxFreq / freqPerBin -- ~465.12
                binsPerBar = (maxBin - minBin) / 60
                barHeights =
                    if model.isPlaying then
                        List.range 0 59
                            |> List.map
                                (\i ->
                                    let
                                        startBin = floor (minBin + toFloat i * binsPerBar)
                                        endBin = floor (minBin + toFloat (i + 1) * binsPerBar)
                                        binValues =
                                            freqData
                                                |> List.drop startBin
                                                |> List.take (endBin - startBin)
                                        sum =
                                            List.sum binValues
                                        count =
                                            toFloat (List.length binValues)
                                        avg =
                                            if count > 0 then sum / count else 0
                                    in
                                    (avg / 255) * 100 * 0.8 -- Scale to 80% of 100px canvas
                                )
                    else
                        List.repeat 60 25.0 -- Static 25% height when paused
            in
                ( { model | barHeights = barHeights }
                , drawWaveform barHeights
                )
        VideoSwitch isSecondary ->
            let
                newVideo =
                    if isSecondary then
                        "/videos/epk-banner-fixed.mp4"
                    else
                        "/videos/epk-banner-fixed-clid.mp4"
                videoCmd =
                    if newVideo /= model.currentVideo then
                        changeVideo newVideo
                    else
                        Cmd.none
            in
            ( { model | currentVideo = newVideo }, videoCmd )

-- VIEW
view : Model -> Html Msg
view model =
    div []
        [ heroBannerContent model.scrollY
        , contentPanel model
        ]

-- SUBSCRIPTIONS
subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ onScroll OnScroll
        , timeUpdate (\(current, duration) -> TimeUpdate current duration)
        , songEnded (\_ -> SongEnded)
        , audioError AudioError
        , if model.isPlaying then frequencyData FrequencyData else Sub.none
        , videoSwitch VideoSwitch
        ]

-- COMPONENTS
heroBannerContent : Float -> Html Msg
heroBannerContent scrollY =
    let
        scale =
            max 0.5 (1 - scrollY / 300)
    in
    div
        [ class "h-screen flex items-center justify-center text-white relative" ]
        [ -- Centered Logo
          div [ class "relative z-10 flex items-center justify-center h-full" ]
              [ img
                    [ src "images/Mortrem-logo-white-transparent.png"
                    , alt "Mortrem Logo"
                    , class "w-[60%] transition-transform duration-300"
                    , style "transform" ("scale(" ++ String.fromFloat scale ++ ")")
                    ]
                    []
              ]
        , div [ class "absolute bottom-0 h-[5%] w-full bg-gradient-to-t from-black to-black/0" ] []
        ]

audioPlayerPanel : Model -> Html Msg
audioPlayerPanel model =
    let
        currentSong =
            List.drop model.currentSongIndex model.songs
                |> List.head
                |> Maybe.withDefault { title = "", src = "", released = False }
        progress =
            if model.duration > 0 then
                (model.currentTime / model.duration) * 100
            else
                0
    in
    -- Media Player
    div [ class "mt-8 mb-12 max-w-2xl mx-auto" ]
        [ -- Song Title
          h2 [ class "text-2xl font-semibold mb-4 text-center" ] [ text currentSong.title ]
        , -- Error Message
          case model.error of
              Just error ->
                  p [ class "text-red-500 mb-4 text-center" ] [ text error ]
              Nothing ->
                  text ""
        , -- Audio Element (hidden)
          audio
            [ id "audioPlayer"
            , src currentSong.src
            , preload "auto"
            , on "timeupdate" (Decode.map2 TimeUpdate
                                   (Decode.at ["target", "currentTime"] Decode.float)
                                   (Decode.at ["target", "duration"] Decode.float))
            , on "ended" (Decode.succeed SongEnded)
            , on "error" (Decode.at ["target", "error", "message"] Decode.string |> Decode.map AudioError)
            , class "hidden"
            ]
            []
        , -- Waveform Canvas
          canvas
            [ id "waveform"
            , width 600
            , height 100
            , class "w-full mb-4"
            ]
            []
        , -- Progress Bar
          div
            [ class "relative w-full h-2 bg-gray-700 rounded-full mb-4" ]
                [ div
                  [ class "absolute h-full bg-white rounded-full"
                  , style "width" (String.fromFloat progress ++ "%")
                  ]
                  []
                , -- Seek button
                  div [ class "absolute top-0 left-0 w-full h-full cursor-pointer"
                    , onClickSeek
                    ]
                    []
              ]
              , -- Controls
                div [ class "flex justify-center space-x-4" ]
                    [ button
                        [ class "px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
                        , onClick PreviousSong
                        ]
                        [ text "Previous" ]
                    , button
                        [ class "px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
                        , onClick PlayPause
                        ]
                        [ text (if model.isPlaying then "Pause" else "Play") ]
                    , button
                        [ class "px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
                        , onClick NextSong
                        ]
                        [ text "Next" ]
                    ]
              ]



contentPanel : Model -> Html Msg
contentPanel model =
    let
        currentSong =
            List.drop model.currentSongIndex model.songs
                |> List.head
                |> Maybe.withDefault { title = "", src = "", released = False }
        progress =
            if model.duration > 0 then
                (model.currentTime / model.duration) * 100
            else
                0
    in
    div [ class "bg-black text-white pt-12 px-48 relative" ]
        [ -- Gradient overlay at the top
          div [ class "absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-black" ] []
        , -- Audio player
          audioPlayerPanel model
        , -- Original Content
          h1 [ class "text-3xl font-semibold mb-4" ] [ text "Who We Are" ]
        , p [ class "leading-relaxed" ]
            [ text "The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost." ]
        , -- Video Switch Marker
          span [ id "marker", class "inline-block" ] []
        ,
        ]


-- Custom Event for Seeking
onClickSeek : Html.Attribute Msg
onClickSeek =
    let
        decodeOffsetX =
            Decode.field "offsetX" Decode.float
        decodeTargetWidth =
            Decode.at [ "target", "offsetWidth" ] Decode.float
    in
    on "click" <|
        Decode.map2
            (\offsetX targetWidth -> SeekProgress (offsetX / targetWidth))
            decodeOffsetX
            decodeTargetWidth

-- BOOTSTRAP
main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
