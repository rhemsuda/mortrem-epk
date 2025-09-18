port module Main exposing (main)

import Browser
import Html exposing (Html, div, span, h1, h2, h3, p, text, img, i, audio, canvas, button, span, table, thead, tbody, tr, th, td)
import Html.Attributes exposing (class, style, src, alt, id, width, height, preload, title, attribute)
import Html.Events exposing (on, onClick)
import Json.Decode as Decode
import DateTime exposing (fromPosix)

import Constants exposing (..)
import Types exposing (Model, Msg (..), Song, Image, GalleryImage, Performance, LineupPosition (..))

import Update.OnScroll as OnScroll
import Update.PlayPause as PlayPause

import Time exposing (millisToPosix)

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
port setBodyScroll : Bool -> Cmd msg


barsCount : Int
barsCount = 10


titleText : String -> Html Msg
titleText msg =
    div [ class "text-white font-serif text-5xl text-center pb-8" ] [ text msg ]

-- MODEL
songs : List Song
songs =
    [ { title = "Kingdom Come", src = "/audio/mortrem-kingdom-come.mp3", duration = 120, released = False, artwork = Nothing }
    , { title = "Nonfiction", src = "/audio/mortrem-nonfiction.mp3", duration = 130, released = True, artwork = Just "/images/coverart/mortrem-nonfiction.png" }
    , { title = "Vanity Box", src = "/audio/mortrem-vanitybox.mp3", duration = 100, released = False, artwork = Nothing }
    ]

videos : List String
videos =
    [ "https://www.youtube.com/embed/pGWly6GZbs4?si=be_sf5X7V4wGHtgC"
    , ""
    ]

bioText1 : String
bioText1 = "Mortrem is the result of raw energy, fearless experimentation, and an obsession with crafting unforgettable live shows. A Waterloo, Ontario-based band determined to reshape the future of alternative metal. With songs that balance intensity and creativity, Mortrem has built a reputation of making audiences feel every emotion of their music.\nMortrem is a band driven to create the ultimate live experience for their fans. In an ever-evolving online world, their ability to engage their fans in a raw and energetic sets them apart from competing acts. From programming their own light shows to writing music that keeps listeners hooked from the first riff to the last note, Mortrem thrives on building moments that linger long after the amps fade. Whether in a packed venue or an intimate club, Mortrem ensures every performance feels immersive, inclusive, and unforgettable."

bioText2 : String
bioText2 = "Born during the pandemic, Mortrem began as a recording project between founding members Kyle Jensen, Sammy Romeo, and Charlie Romeo. What started as a basement experiment quickly grew into something bigger as their catalogue started to take shape into a full album. Drawing on their childhood and modern inspirations in metal and hard rock, the trio carved out Mortrem's distinct sound — heavy, experimental, and engaging. With the addition of Samuel George on vocals and Zak Stulla on bass, the band became a fully realized project, united by a shared vision to push musical and live show boundaries."

bioText3 : String
bioText3 = "Mortrem is currently rounding out their live show cycle that began in September 2024, steadily building a loyal local following while refining a full-scale production show. Their next chapter starts in early 2026 with the release of their debut album One With The Earth — a record designed to set the standard for the band's evolution and mark their entry onto the national stage. Backed by a Canadian tour and a consistent social media presence, this release is positioned to be a foundational blueprint for Mortrem's future."

whyBookMortremText : String
whyBookMortremText = "- We bring a unique sound and energy that keeps crowds engaged.\n-We are great at warming up an audience.\n- We handle our show ourselves (no need for monitoring engineers or lighting techs)"


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




-- idea: do analysis on this information and show the numbers ticking up to the current totals when the user scrolls to them first time
-- also show total number of streams and total number of people we've played to and ratios for fan:revenue and performance:following
performances : List Performance
performances =
    [ { datetime = fromPosix (Time.millisToPosix 1727315100000), venue = venue_theCasbah, totalDraw = 31, ourDraw = 18, organicDraw = 0, newFollowers = 3, merchSales = 400.0, ticketPrice = 15.0, position = Support, durationMinutes = 30, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1731121200000), venue = venue_tailOfTheJunction, totalDraw = 18, ourDraw = 11, organicDraw = 0, newFollowers = 1, merchSales = 10.0, ticketPrice = 15.0, position = Headline, durationMinutes = 30, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1735357500000), venue = venue_jimmyJazz, totalDraw = 43, ourDraw = 14, organicDraw = 0, newFollowers = 8, merchSales = 40.0, ticketPrice = 0.0, position = Support, durationMinutes = 40, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_theUnion, totalDraw = 26, ourDraw = 13, organicDraw = 0, newFollowers = 3, merchSales = 0.0, ticketPrice = 15.0, position = Headline, durationMinutes = 30, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_leesPalace, totalDraw = 47, ourDraw = 19, organicDraw = 0, newFollowers = 6, merchSales = 0.0, ticketPrice = 20.0, position = Support, durationMinutes = 30, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_theUnion, totalDraw = 33, ourDraw = 16, organicDraw = 0, newFollowers = 2, merchSales = 0.0, ticketPrice = 15.0, position = Open, durationMinutes = 30, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_sneakyDees, totalDraw = 67, ourDraw = 17, organicDraw = 3, newFollowers = 12, merchSales = 0.0, ticketPrice = 20.0, position = Headline, durationMinutes = 45, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_absinthe, totalDraw = 42, ourDraw = 13, organicDraw = 1, newFollowers = 4, merchSales = 0.0, ticketPrice = 20.0, position = Headline, durationMinutes = 40, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_duffysTavern, totalDraw = 18, ourDraw = 6, organicDraw = 1, newFollowers = 8, merchSales = 0.0, ticketPrice = 20.0, position = Support, durationMinutes = 30, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_redPapaya, totalDraw = 38, ourDraw = 10, organicDraw = 0, newFollowers = 6, merchSales = 90.0, ticketPrice = 20.0, position = Open, durationMinutes = 30, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_hardLuck, totalDraw = 23, ourDraw = 7, organicDraw = 0, newFollowers = 3, merchSales = 30.0, ticketPrice = 20.0, position = Support, durationMinutes = 30, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_sneakyDees, totalDraw = 16, ourDraw = 9, organicDraw = 2, newFollowers = 5, merchSales = 30.0, ticketPrice = 20.0, position = Headline, durationMinutes = 45, hide = False }
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
      , barHeights = List.repeat barsCount 25.0
      , currentVideo = "/videos/epk-banner-fixed.mp4"
      , isMenuOpen = False
      }
    , Cmd.none
    )


-- VIEW
view : Model -> Html Msg
view model =
    div []
        [ navbar model
        , mobileSidePanel model
        , heroBannerContent model.scrollY
        , marker
        , contentPanel model [ bioPanel model ]
        , videoBanner "Discography" -- TODO: This video should be candid closeup video of the band working on writing
        --, discographySection model
        , contentPanel model [ discographyPanel model, streamingServicesPanel, musicVideosPanel model ]
        , videoBanner "Performance History & Statistics"
        , contentPanel model [ performanceHistoryPanel model, statisticsPanel model ]
        , videoBanner "Gallery"
        , contentPanel model [ imageGallery galleryImages ]
        -- , contentPanel model [ myTestPanel model, imageGallery galleryImages ]
        --, imageGallery galleryImages
        ]


-- UPDATE
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        currentSong =
            List.drop model.currentSongIndex model.songs
                |> List.head
                |> Maybe.withDefault { title = "", src = "", duration = 0, released = False, artwork = Nothing }
    in
    case msg of
        OnScroll y -> OnScroll.handle y model
        PlayPause -> PlayPause.handle currentSong model playAudio pauseAudio
        NextSong -> startSong (model.currentSongIndex + 1) model
        PreviousSong -> startSong (model.currentSongIndex - 1) model
        SelectSong idx -> startSong idx model
        ToggleMenu ->
            let
                newOpen = not model.isMenuOpen
            in
            ( { model | isMenuOpen = newOpen }
            , setBodyScroll newOpen
            )
        CloseMenu ->
            ( { model | isMenuOpen = False }
            , setBodyScroll False
            )
        ScrollTo idStr ->
            ( { model | isMenuOpen = False }
            , Cmd.batch [ scrollToId idStr, setBodyScroll False ]
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


miniPlayer : Model -> Html Msg
miniPlayer model =
    let
        currentSong =
            List.drop model.currentSongIndex model.songs
                |> List.head
                |> Maybe.withDefault { title = "", src = "", duration = 0, released = False, artwork = Nothing }

        playLabel = if model.isPlaying then "Pause" else "Play"
    in
    div [ class "w-full flex items-center gap-3 text-white py-2" ]
        [ div [ class "flex items-center gap-2 cursor-pointer", onClick (ScrollTo "playlist") ]
            [ img [ src (Maybe.withDefault "images/coverart/default.png" currentSong.artwork), alt "Cover", class "w-10 h-10 rounded object-cover" ] []
            , div [ class "text-base truncate" ] [ text currentSong.title ]
            ]
        , div [ class "ml-auto flex items-center gap-3" ]
            [ button [ class "px-3 py-2 rounded hover:bg-white/10", onClick PreviousSong, Html.Attributes.title "Previous" ]
                [ i [ class "fa-solid fa-backward-step text-xl", attribute "aria-hidden" "true" ] [], span [ class "sr-only" ] [ text "Previous" ] ]
            , button [ class "px-3 py-2 rounded hover:bg-white/10", onClick PlayPause, Html.Attributes.title playLabel ]
                [ i [ class ("fa-solid " ++ (if model.isPlaying then "fa-pause" else "fa-play") ++ " text-xl"), attribute "aria-hidden" "true" ] [], span [ class "sr-only" ] [ text playLabel ] ]
            , button [ class "px-3 py-2 rounded hover:bg-white/10", onClick NextSong, Html.Attributes.title "Next" ]
                [ i [ class "fa-solid fa-forward-step text-xl", attribute "aria-hidden" "true" ] [], span [ class "sr-only" ] [ text "Next" ] ]
            ]
        ]


-- playlistTable : Model -> Html Msg
-- playlistTable model =
--     div [ id "playlist", class "bg-neutral-900/70 rounded-xl p-4 text-white" ]
--         [ h2 [ class "text-lg font-semibold mb-3" ] [ text "Playlist" ]
--         , table [ class "w-full table-fixed border-separate border-spacing-0 text-sm" ]
--             [ thead []
--                 [ tr [ class "text-left uppercase text-xs tracking-wide opacity-60" ]
--                     [ th [ class "w-10 py-2 pr-2" ] [ text "#" ]
--                     , th [ class "py-2 pr-2" ] [ text "Title" ]
--                     , th [ class "w-32 py-2 text-right" ] [ text "Status" ]
--                     ]
--                 ]
--             , tbody []
--                 (model.songs
--                     |> List.indexedMap
--                         (\idx song ->
--                             let
--                                 isCurrent = idx == model.currentSongIndex
--                                 rowBase = "cursor-pointer hover:bg-white/10"
--                                 active = if isCurrent then " bg-white/10" else ""
--                                 badgeClasses =
--                                     if isCurrent then
--                                         "inline-flex items-center text-[10px] px-2 py-1 rounded bg-white text-black"
--                                     else
--                                         "inline-flex items-center text-[10px] px-2 py-1 rounded border border-white/30"
--                             in
--                             tr
--                                 [ class (rowBase ++ active)
--                                 , onClick (SelectSong idx)
--                                 ]
--                                 [ td [ class "py-2 pr-2 opacity-70" ] [ text (String.fromInt (idx + 1)) ]
--                                 , td [ class "py-2 pr-2 truncate" ] [ text song.title ]
--                                 , td [ class "py-2 text-right" ]
--                                     [ span [ class badgeClasses ]
--                                         [ text
--                                             (if isCurrent then
--                                                 "Playing"
--                                              else if song.released then
--                                                 "Released"
--                                              else
--                                                 "Unreleased"
--                                             )
--                                         ]
--                                     ]
--                                 ]
--                         )
--                 )
--             ]
--         ]


playlistTableRedesigned : Model -> Html Msg
playlistTableRedesigned model =
    let
        durationFor : Int -> String
        durationFor idx =
            if idx == model.currentSongIndex && model.duration > 0 then
                formatTime model.duration
            else
                "--:--"

        releaseDateFor : Song -> String
        releaseDateFor song =
            if song.released then "—" else "—"
    in
    div
        [ id "playlist"
        , class "mt-6 rounded-2xl bg-slate-900/50 text-white shadow-2xl px-4 py-5 sm:px-6 sm:py-6"
        ]
        [ h3 [ class "text-xl font-semibold mb-4" ] [ text "Playlist" ]
        , div [ class "overflow-hidden rounded-xl" ]
            [ table [ class "w-full table-auto text-sm" ]
                [ -- Column widths (index / title / duration / date)
                  Html.node "colgroup" []
                    [ Html.node "col" [ class "w-12" ] []
                    , Html.node "col" [] []
                    , Html.node "col" [ class "w-24" ] []
                    , Html.node "col" [ class "w-40" ] []
                    ]
                , thead []
                    [ tr [ class "text-left uppercase text-[11px] tracking-wide text-white/60 border-b border-white/10" ]
                        [ th [ class "py-2 pl-3 pr-2" ] [ text "#" ]
                        , th [ class "py-2 pr-2" ] [ text "Song Title" ]
                        , th [ class "py-2 pr-2" ] [ text "Duration" ]
                        , th [ class "py-2 pr-3 text-right" ] [ text "Release Date" ]
                        ]
                    ]
                , tbody []
                    (model.songs
                        |> List.indexedMap
                            (\idx song ->
                                let
                                    isCurrent = idx == model.currentSongIndex
                                    rowBase = "cursor-pointer border-b border-white/5"
                                    rowState = if isCurrent then " bg-white/10" else " hover:bg-white/5"
                                in
                                tr
                                    [ class (rowBase ++ rowState)
                                    , onClick (SelectSong idx)
                                    ]
                                    [ td [ class "py-2 pl-3 pr-2 opacity-70 whitespace-nowrap" ]
                                        [ text (String.fromInt (idx + 1)) ]
                                    , td [ class "py-2 pr-2" ]
                                        [ -- truncate needs a wrapping block with constrained width in table cells
                                          div [ class "truncate" ] [ text song.title ]
                                        ]
                                    , td [ class "py-2 pr-2 whitespace-nowrap" ]
                                        [ text (formatTime song.duration) ]
                                    , td [ class "py-2 pr-3 text-right whitespace-nowrap" ]
                                        [ text (releaseDateFor song) ]
                                    ]
                            )
                    )
                ]
            ]
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

albumArtwork : Song -> String
albumArtwork song =
    Maybe.withDefault "images/coverart/default.png" song.artwork


heroBannerContent : Float -> Html Msg
heroBannerContent scrollY =
    let
        scale =
            max 0 (1 - scrollY / 300)
    in
    div
        [ class "h-screen flex items-center justify-center text-white relative"
        , style "z-index" "10" -- Lower z-index for hero banner
        ]
        [ div [ class "relative z-20 flex items-center justify-center h-full" ]
              [ img
                    [ src "images/Mortrem-logo-white-transparent.png"
                    , alt "Mortrem Logo"
                    , class "w-[60%] transition-transform duration-100"
                    , style "transform" ("scale(" ++ String.fromFloat scale ++ ")")
                    ]
                    []
              ]
        , bottomUpBlackGradientSpan
        ]


videoBanner : String ->Html Msg
videoBanner title =
    div
        [ class "h-screen flex items-center justify-center text-white relative", style "z-index" "10" ]
        [ div [ class "relative z-20 flex items-center justify-center h-full font-serif text-8xl breathe" ] [ text title ]
        , bottomUpBlackGradientSpan
        ]


heroBannerContent2 : Float -> Html Msg
heroBannerContent2 scrollY =
    let
        scale =
            Basics.clamp 0 1 (scrollY / 10000)
        -- scale =
        --     max 0 (1 - scrollY / 300)
    in
    div
        [ class "h-screen flex items-center justify-center text-white relative"
        , style "z-index" "10" -- Lower z-index for hero banner
        ]
        [ div [ class "relative z-20 flex items-center justify-center h-full" ]
              [ img
                    [ src "images/Mortrem-logo-white-transparent.png"
                    , alt "Mortrem Logo"
                    , class "w-[60%] transition-transform duration-100"
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
                |> Maybe.withDefault { title = "", src = "", duration = 0, released = False, artwork = Nothing }
    in
    ( { model
        | currentSongIndex = boundedIndex
        , isPlaying = True
        , currentTime = 0
        , error = Nothing
      }
    , Cmd.batch [ playAudio ( "audioPlayer", nextSong.src ), updateWaveform True ]
    )


-- Centered, responsive discography section with min height = viewport
-- discographySection : Model -> Html Msg
-- discographySection model =
--     div
--         [ class "bg-black w-full px-6 md:px-16 min-h-screen" ]
--         [ div
--             [ class "mx-auto max-w-[80rem] min-h-screen py-18 md:py-26 flex flex-col gap-6 justify-center"
--             ]
--             [ discographyPanel model ]
--         ]

discographyPanel : Model -> Html Msg
discographyPanel model =
    let
        currentSong =
            List.drop model.currentSongIndex model.songs
                |> List.head
                |> Maybe.withDefault
                    { title = "", src = "", duration = 0, released = False, artwork = Nothing }

        progressPct =
            if model.duration > 0 then
                (model.currentTime / model.duration) * 100
            else
                0

        -- artwork fallback (swap to your preferred default)
        artSrc =
            case currentSong.artwork of
                Just url -> url
                Nothing -> "images/coverart/default.png"

        artistName = "Mortrem" -- change if you store artist elsewhere

        releaseDateText =
            -- If you later add dates, format them here; for now show a friendly status
            if currentSong.released then "Released" else "Unreleased"
    in
    div [ class "max-w-5xl mx-auto text-white" ]
        [ audio
            [ id "audioPlayer"
            , src currentSong.src
            , preload "auto"
            , class "hidden"
            ]
            []

        -- Player Card
        , div
            [ class
                (String.join " "
                    [ "rounded-2xl bg-slate-900/50 text-white shadow 2xl"
                    , "px-4 py-5 sm:px-6 sm:py-6"
                    ]
                )
            ]
            [ -- Top row: art | info
              div [ class "grid grid-cols-12 gap-4 sm:gap-6 items-center" ]
                [ -- Album art
                  div [ class "col-span-4 sm:col-span-3 md:col-span-3 flex justify-center" ]
                    [ img
                        [ src artSrc
                        , alt "Album cover art"
                        , class "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl object-cover shadow-md"
                        ]
                        []
                    ]
                , -- Title / artist / release status
                  div [ class "col-span-8 sm:col-span-9 md:col-span-9" ]
                    [ div [ class "flex items-start justify-between gap-4" ]
                        [ div []
                            [ h2 [ class "text-2xl sm:text-3xl font-bold leading-tight" ]
                                [ text currentSong.title ]
                            , p [ class "mt-1 text-sm sm:text-base text-white/70" ]
                                [ text artistName ]
                            ]
                        , span
                            [ class
                                (String.join " "
                                    [ "hidden sm:inline-flex items-center text-xs px-2 py-1"
                                    , "rounded-full border border-white/20"
                                    , if currentSong.released then "bg-white/10" else "bg-amber-500/10 text-amber-200"
                                    ]
                                )
                            ]
                            [ text releaseDateText ]
                        ]
                    , -- Progress bar
                      div [ class "mt-4 relative" ]
                        [ -- track
                          div [ class "w-full h-2 rounded-full bg-slate-700/70 overflow-hidden" ] []
                        , -- fill
                          div
                            [ class "absolute left-0 top-0 h-2 rounded-full bg-sky-400/80"
                            , style "width" (String.fromFloat progressPct ++ "%")
                            ]
                            []
                        , -- click target
                          div
                            [ class "absolute inset-0 cursor-pointer"
                            , onClickSeek
                            ]
                            []
                        ]
                    , -- timecodes (optional)
                      div [ class "mt-1 flex justify-between text-xs text-white/60" ]
                        [ span [] [ text (formatTime model.currentTime) ]
                        , span []
                            [ text
                                (if model.duration > 0 then
                                    formatTime model.duration
                                 else
                                    "--:--"
                                )
                            ]
                        ]
                    ]
                ]
            , -- Controls row
              div [ class "mt-6 flex justify-center gap-4" ]
                [ button
                    [ class "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 shadow-md"
                    , onClick PreviousSong
                    , Html.Attributes.title "Previous"
                    ]
                    [ i [ class "fa-solid fa-backward-step text-xl", Html.Attributes.attribute "aria-hidden" "true" ] []
                    , span [ class "sr-only" ] [ text "Previous" ]
                    ]
                , button
                    [ class "px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 shadow-md"
                    , onClick PlayPause
                    , Html.Attributes.title (if model.isPlaying then "Pause" else "Play")
                    ]
                    [ i
                        [ class
                            ("fa-solid " ++ (if model.isPlaying then "fa-pause" else "fa-play") ++ " text-xl")
                        , Html.Attributes.attribute "aria-hidden" "true"
                        ]
                        []
                    , span [ class "sr-only" ] [ text (if model.isPlaying then "Pause" else "Play") ]
                    ]
                , button
                    [ class "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 shadow-md"
                    , onClick NextSong
                    , Html.Attributes.title "Next"
                    ]
                    [ i [ class "fa-solid fa-forward-step text-xl", Html.Attributes.attribute "aria-hidden" "true" ] []
                    , span [ class "sr-only" ] [ text "Next" ]
                    ]
                ]
            ]
        , -- Playlist Card
          playlistTableRedesigned model
        ]


transparentGapPanel : Html Msg
transparentGapPanel =
    div
        [ class "h-screen w-full"
        , style "background" "transparent"
        ]
        []


navbar : Model -> Html Msg
navbar model =
    div [ id "navbar", class "fixed top-0 left-0 w-full h-18 z-[1000] transition-transform duration-300 ease-in-out transform -translate-y-full" ]
        [ div [ class "h-16 bg-black text-white flex items-center justify-center relative" ]
            [ img [ src "images/Mortrem-logo-white-transparent.png", alt "Mortrem Logo", class "h-12" ] []
            , button
                [ class "absolute right-4 top-1/2 -translate-y-1/2 py-1 px-2.5 rounded-md border border-black bg-white/10 hover:bg-white/15 shadow-md"
                , onClick ToggleMenu
                , Html.Attributes.attribute "aria-label" "Menu"
                , Html.Attributes.attribute "aria-expanded" (if model.isMenuOpen then "true" else "false")
                ]
                [ i [ class ("fa-solid " ++ (if model.isMenuOpen then "fa-xmark" else "fa-bars") ++ " text-lg") ] [] ]
            ]
        , topDownBlackGradientSpan
        ]


mobileSidePanel : Model -> Html Msg
mobileSidePanel model =
    let
        panelClasses =
            "fixed left-0 top-16 h-[calc(100vh-4rem)] z-[900] w-full " ++
            --"w-full " ++ --md:w-1/4 md:max-w-[25vw] " ++            -- ← key change
            "transform transition-transform duration-300 will-change-transform " ++
            "backdrop-blur-xl backdrop-saturate-150 bg-black/95 " ++
            "ring-1 ring-white/10 shadow-2xl text-white overflow-y-auto no-scrollbar"

        translateClass =
            if model.isMenuOpen then " translate-x-0" else " -translate-x-full"
    in
    div [ class (panelClasses ++ translateClass) ]
        [ div [ class "p-4 space-y-6" ]
            [ h2 [ class "text-sm uppercase tracking-wider opacity-80" ] [ text "Media Player" ]
            , miniPlayer model
            , div [ class "space-y-2" ]
                [ h2 [ class "text-sm uppercase tracking-wider opacity-80" ] [ text "Quick Links" ]
                , button [ class "w-full text-left px-3 py-2 rounded hover:bg-white/10", onClick (ScrollTo "playlist") ] [ text "Playlist" ]
                , button [ class "w-full text-left px-3 py-2 rounded hover:bg-white/10", onClick (ScrollTo "bio") ] [ text "Who We Are / Bio" ]
                , button [ class "w-full text-left px-3 py-2 rounded hover:bg-white/10", onClick (ScrollTo "gallery") ] [ text "Gallery" ]
                ]
            ]
        ]



marker : Html Msg
marker =
    span [ id "navbar-marker", class "h-[1px] bg-black block" ] []


contentPanel : Model -> List (Html Msg) -> Html Msg
contentPanel model children =
    div [ class "bg-black w-full px-16 md:px-28" ]
        [ div [ class "mx-auto max-w-[80rem]" ]
              children
        ]


bioPanel : Model -> Html Msg
bioPanel model =
    div [ id "bio", class "flex flex-col pt-12 pb-16 lg:px-16 xl:px-32" ] -- Added padding for smaller screens
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


performanceHistoryPanel : Model -> Html Msg
performanceHistoryPanel model = div [] [text "Performance History"]

statisticsPanel : Model -> Html Msg
statisticsPanel model = div [] [text "Statistics"]

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
    div [ id "gallery", class "w-full pt-26" ]
        [ div [ class "grid grid-cols-12" ]
            <| List.map galleryImageComponent images
        ]

formatTime : Float -> String
formatTime secs =
    let
        total = round secs
        m = total // 60
        s = modBy 60 total
        pad n = if n < 10 then "0" ++ String.fromInt n else String.fromInt n
    in
    (String.fromInt m) ++ ":" ++ pad s


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
