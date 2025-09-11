port module Main exposing (main)

import Browser
import Html exposing (Html, div, h1, h2, p, text, img, audio, canvas, button, span, table, thead, tbody, tr, th, td)
import Html.Attributes exposing (class, style, src, alt, id, width, height, preload)
import Html.Events exposing (on, onClick)
import Json.Decode as Decode

import Types exposing (Model, Msg (..), Song, Image, GalleryImage)

import Update.OnScroll as OnScroll
import Update.PlayPause as PlayPause

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
port scrollToId : String -> Cmd msg


barsCount : Int
barsCount = 10


titleText : String -> Html Msg
titleText msg =
    div [ class "text-white font-serif text-5xl text-center pb-8" ] [ text msg ]

-- MODEL
songs : List Song
songs =
    [ { title = "1. Kingdom Come", src = "/audio/mortrem-kingdom-come.mp3", released = False, artwork = None }
    , { title = "2. Nonfiction", src = "/audio/mortrem-nonfiction.mp3", released = True, artwork = "/images/coverart/mortrem-nonfiction.png" }
    , { title = "3. Vanity Box", src = "/audio/mortrem-vanitybox.mp3", released = False }
    ]

galleryImages : List GalleryImage
galleryImages =
    [ { colSpan = 4, rowSpan = 6, image = { src = "/images/gallery/samuel-george-lees.png", alt = "Samuel George. Lead Singer. Walking on stage in red light." } }
    , { colSpan = 4, rowSpan = 4, image = { src = "/images/gallery/charlie-romeo-lees.png", alt = "Charlie Romeo. Guitar. Playing guitar in green light." } }
    , { colSpan = 4, rowSpan = 4, image = { src = "/images/gallery/charlie-romeo-lees.png", alt = "Charlie Romeo. Guitar. Playing guitar in green light." } }
    , { colSpan = 6, rowSpan = 4, image = { src = "/images/gallery/kyle-jensen-lees.png", alt = "Kyle Jensen. Guitar & Vocals. Playing guitar and singing with a blue light." } }
    , { colSpan = 4, rowSpan = 6, image = { src = "/images/gallery/sammy-romeo-lees.png", alt = "Sammy Romeo. Drums. Playing drums on stage." } }
    , { colSpan = 4, rowSpan = 6, image = { src = "/images/gallery/zak-stulla-lees.png", alt = "Zak Stulla. Bass Guitar. Holding a black bass guitar." } }
    , { colSpan = 4, rowSpan = 4, image = { src = "/images/gallery/charlie-romeo-lees.png", alt = "Charlie Romeo. Guitar. Playing guitar in green light." } }
    ]

bioText1 : String
bioText1 = "Mortrem is the result of raw energy, fearless experimentation, and an obsession with crafting unforgettable live shows. A Waterloo, Ontario-based band determined to reshape the future of alternative metal. With songs that balance intensity and creativity, Mortrem has built a reputation of making audiences feel every emotion of their music.\nMortrem is a band driven to create the ultimate live experience for their fans. In an ever-evolving online world, their ability to engage their fans in a raw and energetic sets them apart from competing acts. From programming their own light shows to writing music that keeps listeners hooked from the first riff to the last note, Mortrem thrives on building moments that linger long after the amps fade. Whether in a packed venue or an intimate club, Mortrem ensures every performance feels immersive, inclusive, and unforgettable."

bioText2 : String
bioText2 = "Born during the pandemic, Mortrem began as a recording project between founding members Kyle Jensen, Sammy Romeo, and Charlie Romeo. What started as a basement experiment quickly grew into something bigger as their catalogue started to take shape into a full album. Drawing on their childhood and modern inspirations in metal and hard rock, the trio carved out Mortrem's distinct sound — heavy, experimental, and engaging. With the addition of Samuel George on vocals and Zak Stulla on bass, the band became a fully realized project, united by a shared vision to push musical and live show boundaries."

bioText3 : String
bioText3 = "Mortrem is currently rounding out their live show cycle that began in September 2024, steadily building a loyal local following while refining a full-scale production show. Their next chapter starts in early 2026 with the release of their debut album One With The Earth — a record designed to set the standard for the band's evolution and mark their entry onto the national stage. Backed by a Canadian tour and a consistent social media presence, this release is positioned to be a foundational blueprint for Mortrem's future."

whyBookMortremText : String
whyBookMortremText = "- We bring a unique sound and energy that keeps crowds engaged.\n-We are great at warming up an audience.\n- We handle our show ourselves (no need for monitoring engineers or lighting techs)"

init : () -> ( Model, Cmd Msg )
init _ =
    ( { scrollY = 0
      , currentSongIndex = 0
      , isPlaying = False
      , currentTime = 0
      , duration = 0
      , songs = songs
      , error = Nothing
      , barHeights = List.repeat barsCount 25.0
      , currentVideo = "/videos/epk-banner-fixed.mp4"
      }
    , Cmd.none
    )

-- UPDATE
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        currentSong =
            List.drop model.currentSongIndex model.songs
                |> List.head
                |> Maybe.withDefault { title = "", src = "", released = False }
    in
    case msg of
        OnScroll y -> OnScroll.handle y model
        PlayPause -> PlayPause.handle currentSong model playAudio pauseAudio
        NextSong -> startSong (model.currentSongIndex + 1) model
        PreviousSong -> startSong (model.currentSongIndex - 1) model
        SelectSong idx -> startSong idx model
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
                -- Map 100 Hz–10 kHz to barsCount bars
                minFreq = 100
                maxFreq = 10000
                sampleRate = 44100
                maxFreqNyquist = sampleRate / 2 -- 22050 Hz
                bins = 1024 -- fftSize / 2
                freqPerBin = maxFreqNyquist / bins
                minBin = minFreq / freqPerBin
                maxBin = maxFreq / freqPerBin
                binsPerBar = (maxBin - minBin) / toFloat barsCount

                barHeights =
                    if model.isPlaying then
                        List.range 0 (barsCount - 1)
                            |> List.map
                                (\i ->
                                    let
                                        startBin = floor (minBin + toFloat i * binsPerBar)
                                        endBin = floor (minBin + toFloat (i + 1) * binsPerBar)
                                        width = max 0 (endBin - startBin)

                                        binValues =
                                            freqData
                                                |> List.drop startBin
                                                |> List.take width

                                        sum = List.sum binValues
                                        count = toFloat (List.length binValues)
                                        avg = if count > 0 then sum / count else 0
                                    in
                                    (avg / 255) * 100 * 0.8 -- scale to 80% of 100px canvas
                                )
                    else
                        List.repeat barsCount 25.0
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


playlistTable : Model -> Html Msg
playlistTable model =
    div [ class "bg-neutral-900/70 rounded-xl p-4 text-white" ]
        [ h2 [ class "text-lg font-semibold mb-3" ] [ text "Playlist" ]
        , table [ class "w-full table-fixed border-separate border-spacing-0 text-sm" ]
            [ thead []
                [ tr [ class "text-left uppercase text-xs tracking-wide opacity-60" ]
                    [ th [ class "w-10 py-2 pr-2" ] [ text "#" ]
                    , th [ class "py-2 pr-2" ] [ text "Title" ]
                    , th [ class "w-32 py-2 text-right" ] [ text "Status" ]
                    ]
                ]
            , tbody []
                (model.songs
                    |> List.indexedMap
                        (\idx song ->
                            let
                                isCurrent = idx == model.currentSongIndex
                                rowBase = "cursor-pointer hover:bg-white/10"
                                active = if isCurrent then " bg-white/10" else ""
                                badgeClasses =
                                    if isCurrent then
                                        "inline-flex items-center text-[10px] px-2 py-1 rounded bg-white text-black"
                                    else
                                        "inline-flex items-center text-[10px] px-2 py-1 rounded border border-white/30"
                            in
                            tr
                                [ class (rowBase ++ active)
                                , onClick (SelectSong idx)
                                ]
                                [ td [ class "py-2 pr-2 opacity-70" ] [ text (String.fromInt (idx + 1)) ]
                                , td [ class "py-2 pr-2 truncate" ] [ text song.title ]
                                , td [ class "py-2 text-right" ]
                                    [ span [ class badgeClasses ]
                                        [ text
                                            (if isCurrent then
                                                "Playing"
                                             else if song.released then
                                                "Released"
                                             else
                                                "Unreleased"
                                            )
                                        ]
                                    ]
                                ]
                        )
                )
            ]
        ]


-- VIEW
view : Model -> Html Msg
view model =
    div []
        [ navbar model -- Navbar is rendered at the top level
        , heroBannerContent model.scrollY
        , marker
        , contentPanel model [ bioPanel model, imageGallery galleryImages ]
        , transparentGapPanel
        , contentPanel model [ myTestPanel model, imageGallery galleryImages ]
        --, imageGallery galleryImages
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
bottomUpBlackGradientSpan : Html Msg
bottomUpBlackGradientSpan =
    div [ class "absolute bottom-0 h-[2%] w-full bg-gradient-to-t from-black to-black/0 z-10" ] []

topDownBlackGradientSpan : Html Msg
topDownBlackGradientSpan =
    div [ class "relative top-0 h-[10%] w-full bg-gradient-to-b from-black to-black/0 z-10" ] []

heroBannerContent : Float -> Html Msg
heroBannerContent scrollY =
    let
        scale =
            max 0.5 (1 - scrollY / 300)
    in
    div
        [ class "h-screen flex items-center justify-center text-white relative"
        , style "z-index" "10" -- Lower z-index for hero banner
        ]
        [ -- Centered Logo
          div [ class "relative z-20 flex items-center justify-center h-full" ]
              [ img
                    [ src "images/Mortrem-logo-white-transparent.png"
                    , alt "Mortrem Logo"
                    , class "w-[60%] transition-transform duration-300"
                    , style "transform" ("scale(" ++ String.fromFloat scale ++ ")")
                    ]
                    []
              ]
        , bottomUpBlackGradientSpan
        ]



startSong : Int -> Model -> ( Model, Cmd Msg )
startSong idx model =
    let
        total = List.length model.songs
        boundedIndex =
            if total == 0 then
                0
            else if idx < 0 then
                total - 1
            else if idx >= total then
                0
            else
                idx

        nextSong =
            model.songs
                |> List.drop boundedIndex
                |> List.head
                |> Maybe.withDefault { title = "", src = "", released = False }
    in
    ( { model
        | currentSongIndex = boundedIndex
        , isPlaying = True
        , currentTime = 0
        , error = Nothing
      }
    , Cmd.batch [ playAudio ( "audioPlayer", nextSong.src ), updateWaveform True ]
    )


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
    div [ class "mt-8 mb-12 max-w-5xl mx-auto text-white" ]
        [ h2 [ class "text-2xl font-semibold mb-4 text-center" ] [ text currentSong.title ]
        , case model.error of
            Just error ->
                p [ class "text-red-500 mb-4 text-center" ] [ text error ]

            Nothing ->
                text ""
        , audio
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
        , div [ class "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start" ]
            [ -- Player (2/3)
              div [ class "lg:col-span-2 bg-neutral-900/70 rounded-xl p-4" ]
                [ -- Visualizer (10 bars)
                  canvas
                    [ id "waveform"
                    , width 600
                    , height 100
                    , class "w-full mb-4"
                    ]
                    []
                , -- Progress
                  div
                    [ class "relative w-full h-2 bg-gray-700 rounded-full mb-4" ]
                    [ div
                        [ class "absolute h-full bg-white rounded-full"
                        , style "width" (String.fromFloat progress ++ "%")
                        ]
                        []
                    , div
                        [ class "absolute top-0 left-0 w-full h-full cursor-pointer"
                        , onClickSeek
                        ]
                        []
                    ]
                , -- Controls
                  div [ class "flex justify-center gap-3" ]
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
              ,
              playlistTable model
            ]
        ]

transparentGapPanel : Html Msg
transparentGapPanel =
    div
        [ class "h-[100px] w-full"
        , style "background" "transparent"
        ]
        []

navbar : Model -> Html Msg
navbar model =
    div [ id "navbar", class "fixed top-0 left-0 w-full h-18 z-[1000] transition-transform duration-300 ease-in-out transform -translate-y-full" ]
        [ div [ class "h-16 bg-black text-white flex items-center justify-center relative" ]
              [ img [ src "images/Mortrem-logo-white-transparent.png", alt "Mortrem Logo", class "h-12" ] [] ]
        , topDownBlackGradientSpan
        ]

marker : Html Msg
marker =
    span [ id "navbar-marker", class "h-[1px] bg-black block" ] []

bioPanel : Model -> Html Msg
bioPanel model =
    div [ class "flex flex-col pt-12 pb-16 lg:px-16 xl:px-32" ] -- Added padding for smaller screens
        [ div [ class "py-2 lg:py-4 lg:flex lg:flex-row lg:items-stretch lg:gap-4" ] -- items-stretch aligns heights
              [ div [ class "lg:w-2/5" ]
                  [ img [ src "images/zak-charlie-fourleaf.png", alt "test", class "w-full h-full object-cover" ] [] ]
              , div [ class "lg:w-3/5 text-white text-md leading-relaxed" ] [ text bioText1 ]
              ]
        , div [ class "py-2 lg:py-4 lg:flex lg:flex-row lg:items-stretch lg:gap-4" ] -- items-stretch aligns heights
              [ div [ class "lg:w-3/5 text-white text-md leading-relaxed hidden lg:block" ] [ text bioText2 ]
              , div [ class "lg:w-2/5" ]
                  [ img [ src "images/mortrem-profile.jpg", alt "test", class "w-full h-full object-cover" ] [] ]
              , div [ class "text-white text-md leading-relaxed visible lg:hidden" ] [ text bioText2 ]
              ]
        , div [ class "py-2 lg:py-4 lg:flex lg:flex-row lg:items-stretch lg:gap-4" ] -- items-stretch aligns heights
              [ div [ class "lg:w-2/5" ]
                  [ img [ src "images/mortrem-profile.jpg", alt "test", class "w-full h-full object-cover" ] [] ]
              , div [ class "lg:w-3/5 text-white text-md leading-relaxed" ] [ text bioText3 ]
              ]
        ]

contentPanel : Model -> List (Html Msg) -> Html Msg
contentPanel model children =
    div [ class "bg-black w-full px-28" ]
        [ div [ class "mx-auto max-w-[80rem]" ]
              children
        ]

myTestPanel : Model -> Html Msg
myTestPanel model =
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
    div [ class "text-white pt-12 px-48 relative" ]
        [ -- Gradient overlay at the top
          div [ class "absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-black" ] []
        , -- Audio player
          audioPlayerPanel model
        , -- Original Content
          h1 [ class "text-3xl font-semibold mb-4" ] [ text "Who We Are" ]
        , p [ class "leading-relaxed" ]
            [ text "The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost." ]
        , -- Video Switch Marker
          span [ id "marker", class "h-[1px] bg-transparent" ] []
        ]

colrowspan : Int -> Int -> String
colrowspan col row = "col-span-" ++ String.fromInt col ++ " " ++ "row-span-" ++ String.fromInt row

imageGalleryClasses : Int -> Int -> String
imageGalleryClasses col row = colrowspan col row

galleryImageComponent : GalleryImage -> Html Msg
galleryImageComponent galleryImage =
    img [ src galleryImage.image.src
        , class (imageGalleryClasses galleryImage.colSpan galleryImage.rowSpan)
        ] []

imageGallery : List GalleryImage -> Html Msg
imageGallery images =
    div [ class "w-full" ]
        [ titleText "Gallery"
        , div [ class "grid grid-cols-12" ]
            <| List.map galleryImageComponent images
        ]


onClickSeek : Html.Attribute Msg
onClickSeek =
    let decodeOffsetX =
            Decode.field "offsetX" Decode.float
        decodeWidth =
            Decode.at [ "currentTarget", "offsetWidth" ] Decode.float
    in
    on "click" <|
        Decode.map2
            (\offsetX width ->
                let
                    frac =
                        if width > 0 then
                            offsetX / width
                        else
                            0
                in
                SeekProgress (Basics.clamp 0 1 frac)
            )
            decodeOffsetX
            decodeWidth

-- Custom Event for Seeking
onClickSeek2 : Html.Attribute Msg
onClickSeek2 =
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
