port module Main exposing (main)

import Browser
import Http
import Json.Encode as Encode
import Json.Decode as Decode exposing (Decoder)
import Browser.Dom as Dom
import Browser.Events
import Task

import Html exposing (Html, div, span, h1, h2, h3, p, text, img, i, audio, canvas, button, table, thead, tbody, tr, th, td, a, input, small, textarea, li, ul, hr)
import Html.Attributes exposing (class, style, src, alt, id, href, target, width, height, preload, title, attribute)
import Html.Events exposing (on, onClick, onInput, onSubmit, stopPropagationOn, preventDefaultOn)
import DateTime exposing (fromPosix)

import Constants exposing (..)
import Utils exposing (..)
import Types exposing (..)

import Update.OnScroll as OnScroll
import Update.PlayPause as PlayPause

import Set exposing (Set)
import Dict exposing (Dict)
import DateTime exposing (DateTime, fromPosix, toPosix)

import Statistics exposing (..)

import Time exposing (millisToPosix, Zone, Month(..), here, toYear, toMonth, toDay, toHour, toMinute)

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
port setActiveBg : Int -> Cmd msg
port scrollToId : String -> Cmd msg
port setBodyScroll : Bool -> Cmd msg
port scrollReel : (String, Int) -> Cmd msg
port copyToClipboard : String -> Cmd msg


barsCount : Int
barsCount = 10


-- MODEL
songs : List Song
songs =
    [ { title = "Kingdom Come", src = "assets/audio/mortrem-kingdom-come.mp3", duration = 120, released = False, artwork = Nothing }
    , { title = "Nonfiction", src = "assets/audio/mortrem-nonfiction.mp3", duration = 130, released = True, artwork = Just "assets/images/coverart/mortrem-nonfiction.png" }
    , { title = "Vanity Box", src = "assets/audio/mortrem-vanitybox.mp3", duration = 100, released = False, artwork = Nothing }
    ]

musicVideos : List YoutubeVideo
musicVideos =
    [ { title = "WATCH: Mortrem's Epic Performance at the Whiskey Pit Will Leave You Speechless!", youtubeId = "BBLWe1Go59E", thumbnail = "" }
    , { title = "Mortrem - Nonfiction (Music Video)", youtubeId = "pGWly6GZbs4", thumbnail = "" }
    , { title = "Mortrem - Big Blue (Official Lyric Video)", youtubeId = "tsgr0ryIGAY", thumbnail = "" }
    ]

bioText1 : String
bioText1 = "Mortrem is the result of raw energy, fearless experimentation, and an obsession with crafting unforgettable live shows. A Waterloo, Ontario-based band determined to reshape the future of alternative metal. With songs that balance intensity and creativity, Mortrem has built a reputation of making audiences feel every emotion of their music.\nMortrem is a band driven to create the ultimate live experience for their fans. In an ever-evolving online world, their ability to engage their fans in a raw and energetic sets them apart from competing acts. From programming their own light shows to writing music that keeps listeners hooked from the first riff to the last note, Mortrem thrives on building moments that linger long after the amps fade. Whether in a packed venue or an intimate club, Mortrem ensures every performance feels immersive, inclusive, and unforgettable."

bioText2 : String
bioText2 = "Born during the pandemic, Mortrem began as a recording project between founding members Kyle Jensen, Sammy Romeo, and Charlie Romeo. What started as a basement experiment quickly grew into something bigger as their catalogue started to take shape into a full album. Drawing on their childhood and modern inspirations in metal and hard rock, the trio carved out Mortrem's distinct sound — heavy, experimental, and engaging. With the addition of Samuel George on vocals and Zak Stulla on bass, the band became a fully realized project, united by a shared vision to push musical and live show boundaries."

bioText3 : String
bioText3 = "Mortrem is currently rounding out their first live show cycle that began in September 2024, steadily building a loyal local following while refining a full-scale production show. Their next chapter starts in early 2026 with the release of their debut album One With The Earth — a record designed to set the standard for the band's evolution and mark their entry onto the national stage. Backed by a Canadian tour and a consistent social media presence, this release is positioned to be a foundational blueprint for Mortrem's future."

whyBookMortremText : String
whyBookMortremText = "- We bring a unique sound and energy that keeps crowds engaged.\n-We are great at warming up an audience.\n- We handle our show ourselves (no need for monitoring engineers or lighting techs)"


galleryImages : List GalleryImage
galleryImages =
    [ { colSpan = 4, rowSpan = 6, image = { src = "assets/images/gallery/samuel-george-lees.png", alt = "Samuel George. Lead Singer. Walking on stage in red light." } }
    , { colSpan = 4, rowSpan = 4, image = { src = "assets/images/gallery/charlie-romeo-lees.png", alt = "Charlie Romeo. Guitar. Playing guitar in green light." } }
    , { colSpan = 4, rowSpan = 4, image = { src = "assets/images/gallery/charlie-romeo-lees.png", alt = "Charlie Romeo. Guitar. Playing guitar in green light." } }
    , { colSpan = 6, rowSpan = 4, image = { src = "assets/images/gallery/kyle-jensen-lees.png", alt = "Kyle Jensen. Guitar & Vocals. Playing guitar and singing with a blue light." } }
    , { colSpan = 4, rowSpan = 6, image = { src = "assets/images/gallery/sammy-romeo-lees.png", alt = "Sammy Romeo. Drums. Playing drums on stage." } }
    , { colSpan = 4, rowSpan = 6, image = { src = "assets/images/gallery/zak-stulla-lees.png", alt = "Zak Stulla. Bass Guitar. Holding a black bass guitar." } }
    , { colSpan = 4, rowSpan = 4, image = { src = "assets/images/gallery/charlie-romeo-lees.png", alt = "Charlie Romeo. Guitar. Playing guitar in green light." } }
    ]


-- idea: do analysis on this information and show the numbers ticking up to the current totals when the user scrolls to them first time
-- also show total number of streams and total number of people we've played to and ratios for fan:revenue and performance:following
performances : List Performance
performances =
    [ { datetime = fromPosix (Time.millisToPosix 1727315100000), venue = venue_theCasbah, totalDraw = 31, ourDraw = 18, organicDraw = 0, newFollowers = 3, merchSales = 400.0, ticketPrice = 15.0, position = Support, durationMinutes = 30, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1731121200000), venue = venue_tailOfTheJunction, totalDraw = 18, ourDraw = 11, organicDraw = 0, newFollowers = 1, merchSales = 10.0, ticketPrice = 15.0, position = Headline, durationMinutes = 30, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1735357500000), venue = venue_jimmyJazz, totalDraw = 43, ourDraw = 14, organicDraw = 0, newFollowers = 8, merchSales = 40.0, ticketPrice = 0.0, position = Support, durationMinutes = 40, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_theUnion, totalDraw = 26, ourDraw = 13, organicDraw = 0, newFollowers = 3, merchSales = 0.0, ticketPrice = 15.0, position = Headline, durationMinutes = 30, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_leesPalace, totalDraw = 63, ourDraw = 27, organicDraw = 4, newFollowers = 6, merchSales = 0.0, ticketPrice = 20.0, position = Support, durationMinutes = 30, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_theUnion, totalDraw = 33, ourDraw = 16, organicDraw = 0, newFollowers = 2, merchSales = 0.0, ticketPrice = 15.0, position = Open, durationMinutes = 30, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_sneakyDees, totalDraw = 67, ourDraw = 17, organicDraw = 3, newFollowers = 12, merchSales = 0.0, ticketPrice = 20.0, position = Headline, durationMinutes = 45, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_absinthe, totalDraw = 42, ourDraw = 13, organicDraw = 1, newFollowers = 4, merchSales = 0.0, ticketPrice = 20.0, position = Headline, durationMinutes = 40, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_duffysTavern, totalDraw = 18, ourDraw = 6, organicDraw = 1, newFollowers = 8, merchSales = 0.0, ticketPrice = 20.0, position = Support, durationMinutes = 30, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_redPapaya, totalDraw = 38, ourDraw = 10, organicDraw = 0, newFollowers = 6, merchSales = 90.0, ticketPrice = 20.0, position = Open, durationMinutes = 30, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_hardLuck, totalDraw = 23, ourDraw = 7, organicDraw = 0, newFollowers = 3, merchSales = 30.0, ticketPrice = 20.0, position = Support, durationMinutes = 30, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    , { datetime = fromPosix (Time.millisToPosix 1739062800000), venue = venue_sneakyDees, totalDraw = 16, ourDraw = 9, organicDraw = 2, newFollowers = 5, merchSales = 30.0, ticketPrice = 20.0, position = Headline, durationMinutes = 45, merchSold = { shirts = 0, stickers = 0 }, hide = False }
    ]

testimonials : List Testimonial
testimonials =
    [ { id = 1
      , media = LbYoutube { title = "Inside the Mind of Mortrem: Exclusive Chat on Their Origin and What's Next on the Podcouch!", youtubeId = "4EzaFS2c0l4", thumbnail = "" }
      , quote = "These guys ripped an absolutely  insane set! Each song is totally different, the timing changes and break downs are mind blowing! They are super talented musicians that are very dedicated to their band! We had a wicked time with them and  we suggest that you get out to their next show and experience it your self! Give them a follow, stream their music and don't miss out!"
      , author = "Shane & Ben @ Rye Field Studios"
      , quotedAt = fromPosix (Time.millisToPosix 1735190400000)
      }
    , { id = 2
      , media = LbImage { src = "assets/images/testimonials/whiskey-pit.jpg", alt = "Joe in the crowd" }
      , quote = "Professional and punctual. Easy to work with and they deliver."
      , author = "Shelly – The Casbah"
      , quotedAt = fromPosix (Time.millisToPosix 1727481600000) -- 2024-09-28
      }
    , { id = 3
      , media = LbImage { src = "assets/images/testimonials/whiskey-pit.jpg", alt = "Joe in the crowd" }
      , quote = "Crowd loved them. We want them back."
      , author = "AJ – Sneaky Dee’s"
      , quotedAt = fromPosix (Time.millisToPosix 1731196800000) -- 2024-11-10
      }
    ]


init : () -> ( Model, Cmd Msg )
init _ =
    ( { scrollY = 0
      , viewportW = 0
      , viewportH = 0
      , videoMarkerIds = Constants.videoMarkerIds
      --, markerPositions = Dict.empty
      , videoSources = videoBgSources
      , videoMarkers = []
      , activeBgIndex = 0
      , currentSongIndex = 0
      , isPlaying = False
      , currentTime = 0
      , duration = 0
      , songs = songs
      , musicVideos = musicVideos
      , selectedMusicVideoIndex = 0
      , error = Nothing
      , barHeights = List.repeat barsCount 25.0
      , isMenuOpen = False
      , contact = { name = "", email = "", message = "", honeypot = "" }
      , contactStatus = ContactIdle
      , isContactModalOpen = False
      , debugMarkers = True
      , visiblePerfCount = 5
      , expandedPerf = Set.empty
      , zone = Time.utc
      , now = Time.millisToPosix 0
      , testimonials = testimonials
      , lightbox = Nothing
      , draggingTestimonials = Nothing
      }
    , Cmd.batch
          [ Task.attempt GotViewport Dom.getViewport  -- sync scroll and height now
          , measureMarkersCmd videoMarkerIds    -- measure all markers atomically
          , Task.perform GotZone Time.here
          , Task.perform GotNow Time.now
          ]
    )


-- VIEW
view : Model -> Html Msg
view model =
    div []
        [ --backgroundVideoLayer model
        navbar model
        , mobileSidePanel model
        , heroBannerContent model.scrollY
        , navbarMarker
        , contentPanel model [ bioPanel model, videoSwitchMarker1 ]

        , videoBanner "Music & Videos" -- TODO: This video should be candid closeup video of the band working on writing

        --, discographySection model
        , contentPanel model [ discographyPanel model, musicVideosPanel model, videoSwitchMarker2 ]
        , videoBanner "Performance Metrics"
        , contentPanel model [ performanceHistoryPanel model, statisticsPanel model, testimonialsPanel model, videoSwitchMarker3 ]
        , videoBanner "Gallery"
        , contentPanel model [ imageGallery galleryImages ]
        , footer model
        ]


-- UPDATE
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        currentSong =
            List.drop model.currentSongIndex model.songs
                |> List.head
                |> Maybe.withDefault { title = "", src = "", duration = 0, released = False, artwork = Nothing }
        validEmail e =
            String.contains "@" e && String.contains "." e && String.length e > 5
    in
    case msg of
        OnScroll y -> OnScroll.handle y model setActiveBg
        OpenLightbox payload ->
            ( { model | lightbox = Just payload }, setBodyScroll True )
        CloseLightbox ->
            ( { model | lightbox = Nothing }, setBodyScroll False )
        GotViewport (Ok vp) ->
            let
                w = vp.viewport.width
                h = vp.viewport.height
                y = vp.viewport.y

                initCount =
                    if model.visiblePerfCount == 10 && w < Constants.mobileThreshold then
                        5
                    else
                        model.visiblePerfCount
            in
            ( { model | viewportW = w, viewportH = h, scrollY = y, visiblePerfCount = initCount }
            , Cmd.none
            )
        GotViewport (Err _) ->
            ( model, Cmd.none )
        ViewportResized newW newH ->
            ( { model | viewportW = toFloat newW, viewportH = toFloat newH }
            , Cmd.batch
                [ Task.attempt GotViewport Dom.getViewport
                , measureMarkersCmd videoMarkerIds
                ]
            )
        MarkersMeasured pairs ->
            let
                sorted = List.sortBy Tuple.second pairs

                bottom = model.scrollY + model.viewportH
                vidsLen = List.length model.videoSources

                idx = activeIndexFrom bottom sorted vidsLen

                swapCmd =
                    if idx /= model.activeBgIndex then
                        setActiveBg idx
                    else
                        Cmd.none
            in
                ( { model | videoMarkers = sorted, activeBgIndex = idx }
                , swapCmd
                )
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
        SelectMusicVideo idx ->
            ( { model | selectedMusicVideoIndex = idx }, Cmd.none )
        ScrollVideoReelLeft ->
            ( model, scrollReel ("video-reel", -1) )
        ScrollVideoReelRight ->
            ( model, scrollReel ("video-reel", 1) )
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
        UpdateContactName v ->
            let
                c = model.contact
            in
                ( { model | contact = { c | name = v }, contactStatus = ContactEditing }
                , Cmd.none
                )
        UpdateContactEmail v ->
            let
                c = model.contact
            in
                ( { model | contact = { c | email = v }, contactStatus = ContactEditing }
                , Cmd.none
                )
        UpdateContactMessage v ->
            let
                c = model.contact
            in
                ( { model | contact = { c | message = v }, contactStatus = ContactEditing }
                , Cmd.none
                )
        UpdateContactHoneypot v ->
            let
                c = model.contact
            in
                ( { model | contact = { c | honeypot = v } }
                , Cmd.none
                )
        SubmitContact ->
            let
                c = model.contact
                valid =
                    String.length c.name >= 2
                        && String.contains "@" c.email
                            && String.length c.message >= 5
                                && String.length c.honeypot == 0
            in
                if not valid then
                    ( { model | contactStatus = ContactError "Please complete all fields correctly." }
                    , Cmd.none
                    )
                else
                    ( { model | contactStatus = ContactSending }
                    , postContact c
                    )

        ContactSent (Ok resp) ->
            if resp.success then
                ( { model | contactStatus = ContactSuccess }
                , Cmd.none
                )
            else
                ( { model | contactStatus = ContactError resp.message }
                , Cmd.none
                )

        ContactSent (Err httpErr) ->
            ( { model | contactStatus = ContactError (httpErrorToString httpErr) }
            , Cmd.none
            )

        DismissContactModal ->
            ( { model | contactStatus = ContactIdle }, Cmd.none )

        CopyBandEmail ->
            ( model, copyToClipboard bandEmail )

        GotZone z ->
            ( { model | zone = z }, Cmd.none )

        GotNow p ->
            ( { model | now = p }, Cmd.none )

        TogglePerformance i ->
            let
                exp =
                    if Set.member i model.expandedPerf then
                        Set.remove i model.expandedPerf
                    else
                        Set.insert i model.expandedPerf
            in
            ( { model | expandedPerf = exp }, Cmd.none )

        LoadMorePerformances ->
            let
                step = if model.viewportW < Constants.mobileThreshold then 3 else 5
            in
            ( { model | visiblePerfCount = model.visiblePerfCount + step }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


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
            [ img [ src (albumArtwork currentSong), alt "Cover", class "w-10 h-10 rounded object-cover" ] []
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
        , Browser.Events.onResize ViewportResized
        , timeUpdate (\(current, duration) -> TimeUpdate current duration)
        , songEnded (\_ -> SongEnded)
        , audioError AudioError
        , if model.isPlaying then frequencyData FrequencyData else Sub.none
        ]


socialMediaLinks : Html Msg
socialMediaLinks =
    div []
        [ h3 [ class "uppercase text-sm tracking-wider text-white/70 mb-3" ] [ text "Follow us" ]
        ,  div [ class "flex items-center gap-4 text-2xl" ]
            [ a [ href "https://open.spotify.com/artist/1z9AQTlfG5SjjDtKf1r2Mt", target "_blank", class "hover:text-white/70" ] [ i [ class "fa-brands fa-spotify" ] [] ]
            , a [ href "https://music.apple.com/ca/artist/mortrem/1723532370", target "_blank", class "hover:text-white/70" ] [ i [ class "fa-brands fa-apple" ] [] ]
            , a [ href "https://www.youtube.com/channel/UCLaZTiER4UOVGzsCV50tbfA", target "_blank", class "hover:text-white/70" ] [ i [ class "fa-brands fa-youtube" ] [] ]
            , a [ href "https://instagram.com/mortremband", target "_blank", class "hover:text-white/70" ] [ i [ class "fa-brands fa-instagram" ] [] ]
            , a [ href "https://tiktok.com/@mortremband", target "_blank", class "hover:text-white/70" ] [ i [ class "fa-brands fa-tiktok" ] [] ]
            ]
        , hr [ class "my-6 border-white/10" ] []
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
    Maybe.withDefault "assets/images/coverart/default.png" song.artwork


heroBannerContent : Float -> Html Msg
heroBannerContent scrollY =
    let
        scale =
            max 0 (1 - scrollY / 300)
    in
    div
        [ class "h-screen ios:h-[100svh] flex items-center justify-center text-white relative"
        , style "z-index" "10" -- Lower z-index for hero banner
        ]
        [ div [ class "relative z-20 flex items-center justify-center h-full" ]
              [ img
                    [ src "assets/images/Mortrem-logo-white-transparent.png"
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
        [ div [ class "relative z-20 flex items-center justify-center h-full font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl breathe" ] [ text title ]
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
                Nothing -> "assets/images/coverart/default.png"

        artistName = "Mortrem" -- change if you store artist elsewhere

        releaseDateText =
            -- If you later add dates, format them here; for now show a friendly status
            if currentSong.released then "Released" else "Unreleased"
    in
    div [ id "discography", class "pt-16 md:pt-28 lg:px-16 md:max-w-5xl lg:max-w-8xl mx-auto text-white" ]
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


streamingServicesPanel : Html Msg
streamingServicesPanel =
    div [ class "pt-8 md:pt-16 pb-8 md:pb-16 lg:px-16 xl:px-32" ]
        [ h1 [ class "text-lg md:text-xl text-white font-bold" ] [ text "Streaming Links" ]
        , div [ class "flex items-center justify-center gap-8 md:gap-24 py-6 md:py-12" ]
            [ a
              [ href "https://open.spotify.com/artist/1z9AQTlfG5SjjDtKf1r2Mt?si=pnTiiO5UTziuu4YgCPaTAA"
              , target "_blank"
              ]
              [ img
                    [ src "assets/images/spotify-logo.png"
                    , class "max-w-18 md:max-w-32"
                    , alt "Spotify logo. Clicking this takes you to Mortrem's Spotify page."
                    ]
                    []
              ]
            , a
              [ href "https://music.apple.com/ca/artist/mortrem/1723532370"
              , target "_blank"
              ]
              [ img
                    [ src "assets/images/apple-music-logo.png"
                    , class "max-w-14 md:max-w-28"
                    , alt "Apple Music logo. Clicking this takes you to Mortrem's Apple Music page."
                    ]
                    []
              ]
            , a
              [ href "https://www.youtube.com/channel/UCLaZTiER4UOVGzsCV50tbfA"
              , target "_blank"
              ]
              [ img
                    [ src "assets/images/youtube-logo.png"
                    , class "max-w-18 md:max-w-32"
                    , alt "Youtube logo. Clicking this takes you to Mortrem's Youtube page."
                    ]
                    []
              ]
            ]
        ]

musicVideosPanel : Model -> Html Msg
musicVideosPanel model =
    let
        videos = model.musicVideos
        currentVideo =
            List.drop model.selectedMusicVideoIndex videos
                |> List.head
                |> Maybe.withDefault
                    { title = "", youtubeId = "", thumbnail = "" }
    in
    div [ class "pt-8 py-16 md:py-24 md:pt-16 lg:px-16 xl:px-32" ]
        [ h1 [ class "text-lg md:text-xl text-white font-bold mb-4 md:mb-6" ] [ text "Videos" ]

        , -- EMBED PLAYER (16:9, rounded)
          div [ class "relative w-full rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-black" ]
            [ div [ class "pt-[56.25%]" ] []  -- aspect-ratio shim (16:9)
            , Html.node "iframe"
                [ attribute "src" (youtubeEmbedUrl currentVideo.youtubeId)
                , attribute "title" currentVideo.title
                , class "absolute inset-0 w-full h-full"
                , attribute "frameborder" "0"
                , attribute "allow"
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                , attribute "allowfullscreen" ""
                , attribute "referrerpolicy" "strict-origin-when-cross-origin"
                ]
                []
            ]

        , -- THUMB REEL
          div [ class "relative mt-4" ]
            [ -- Left arrow
              button
                [ class "absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 shadow"
                , onClick ScrollVideoReelLeft
                , attribute "aria-label" "Scroll left"
                ]
                [ i [ class "fa-solid fa-chevron-left text-white" ] [] ]

            , -- Reel
              div
                [ id "video-reel"
                , class (String.join " "
                             [ "mx-10 px-4 md:px-6 py-2"
                             , "flex gap-3 overflow-x-auto no-scrollbar scroll-smooth"
                             , "snap-x snap-mandatory"
                             , "[scroll-padding-left:1rem] [scroll-padding-right:1rem]"
                             ]
                        )
                ]
                (videos
                    |> List.indexedMap
                        (\idx mv ->
                            let
                                isCurrent = idx == model.selectedMusicVideoIndex
                                ringCls =
                                    if isCurrent then
                                        "ring-2 ring-gray-400"
                                    else
                                        "ring-1 ring-white/15 hover:ring-white/30"
                            in
                            button
                                [ class
                                    ("relative flex-shrink-0 snap-start " ++
                                     "rounded-xl overflow-hidden bg-black/60 " ++
                                     "w-40 sm:w-52 md:w-60 aspect-video " ++
                                     ringCls)
                                , onClick (SelectMusicVideo idx)
                                , attribute "title" mv.title
                                ]
                                [ img
                                    [ src (youtubeThumb mv)
                                    , alt mv.title
                                    , class "absolute inset-0 w-full h-full object-cover opacity-90"
                                    ]
                                    []
                                , div
                                    [ class
                                        "absolute inset-0 flex items-center justify-center"
                                    ]
                                    [ div
                                        [ class
                                            ("rounded-full p-3 bg-black/50 " ++
                                             (if isCurrent then "text-gray-300" else "text-white"))
                                        ]
                                        [ i [ class "fa-solid fa-play" ] [] ]
                                    ]
                                ]
                        )
                )

            , -- Right arrow
              button
                [ class "absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 shadow"
                , onClick ScrollVideoReelRight
                , attribute "aria-label" "Scroll right"
                ]
                [ i [ class "fa-solid fa-chevron-right text-white" ] [] ]
            ]
        ]


navbar : Model -> Html Msg
navbar model =
    div [ id "navbar"
        , attribute "data-ready" "false"
        , class
            ("fixed top-0 left-0 w-full h-18 z-[1000] transform -translate-y-full" ++
            "data-[ready=true]:transition-transform data-[ready=true]:duration-300 data-[ready=true]:ease-in-out ")
        ]
        [ div [ class "h-16 bg-black text-white flex items-center justify-center relative" ]
            [ img [ src "assets/images/Mortrem-logo-white-transparent.png", alt "Mortrem Logo", class "h-12" ] []
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
            "transform will-change-transform " ++
            "backdrop-blur-xl backdrop-saturate-150 bg-black/95 " ++
            "ring-1 ring-white/10 shadow-2xl text-white overflow-y-auto no-scrollbar " ++
            "data-[ready=true]:transition-transform data-[ready=true]:duration-300"

        translateClass =
            if model.isMenuOpen then " translate-x-0" else " -translate-x-full"
    in
    div [ id "sidepanel", class (panelClasses ++ translateClass) ]
        [ div [ class "p-4 space-y-6" ]
            [ h2 [ class "text-sm uppercase tracking-wider opacity-80" ] [ text "Media Player" ]
            , miniPlayer model
            , div [ class "space-y-2" ]
                [ h2 [ class "text-sm uppercase tracking-wider opacity-80" ] [ text "Quick Links" ]
                , button [ class "w-full text-left px-3 py-2 rounded hover:bg-white/10", onClick (ScrollTo "bio") ] [ text "Who We Are" ]
                , button [ class "w-full text-left px-3 py-2 rounded hover:bg-white/10", onClick (ScrollTo "discography") ] [ text "Music & Videos" ]
                , button [ class "w-full text-left px-3 py-2 rounded hover:bg-white/10", onClick (ScrollTo "performance-history") ] [ text "Performance Metrics" ]
                , button [ class "w-full text-left px-3 py-2 rounded hover:bg-white/10", onClick (ScrollTo "gallery") ] [ text "Gallery" ]
                ]
            ]
            , div [ class "p-4 space-y-2 text-white" ]
              [ socialMediaLinks
              ]
        ]


navbarMarker : Html Msg
navbarMarker =
    span [ id "navbar-marker", class "h-[0px] bg-black block" ] []

videoSwitchMarker1 : Html Msg
videoSwitchMarker1 =
    span [ id "videoswitch-marker-1", class "h-[0px] bg-black block" ] []

videoSwitchMarker2 : Html Msg
videoSwitchMarker2 =
    span [ id "videoswitch-marker-2", class "h-[0px] bg-black block" ] []

videoSwitchMarker3 : Html Msg
videoSwitchMarker3 =
    span [ id "videoswitch-marker-3", class "h-[0px] bg-black block" ] []


contentPanel : Model -> List (Html Msg) -> Html Msg
contentPanel model children =
    div [ class "bg-black w-full px-8 sm:px-16 md:px-24" ]
        [ div [ class "mx-auto max-w-[60rem]" ]
              children
        ]


bioPanel : Model -> Html Msg
bioPanel model =
    div [ id "bio", class "flex flex-col pt-6 md:pt-12 pb-16" ] -- Added padding for smaller screens
        [ div [ class "py-2 lg:py-4 lg:flex lg:flex-row lg:items-stretch lg:gap-4" ] -- items-stretch aligns heights
              [ div [ class "lg:w-2/5" ]
                    [ clickableImage { src = "assets/images/zak-charlie-fourleaf.png", alt = "test", caption = Nothing, extraText = Nothing, classes = "w-full h-full object-cover" } ]
                  --[ img [ src "assets/images/zak-charlie-fourleaf.png", alt "test", class "w-full h-full object-cover" ] [] ]
              , div [ class "pt-4 md:pt-6 lg:pt-0 lg:w-3/5 text-white text-md leading-relaxed" ] [ text bioText1 ]
              ]
        , div [ class "py-2 lg:py-4 lg:flex lg:flex-row lg:items-stretch lg:gap-4" ] -- items-stretch aligns heights
              [ div [ class "lg:w-3/5 text-white text-md leading-relaxed hidden lg:block" ] [ text bioText2 ]
              , div [ class "lg:w-2/5" ]
                  [ img [ src "assets/images/mortrem-profile.jpg", alt "test", class "w-full h-full object-cover" ] [] ]
              , div [ class "pt-4 md:pt-6 lg:pt-0 text-white text-md leading-relaxed visible lg:hidden" ] [ text bioText2 ]
              ]
        , div [ class "py-2 lg:py-4 lg:flex lg:flex-row lg:items-stretch lg:gap-4" ] -- items-stretch aligns heights
              [ div [ class "lg:w-2/5" ]
                  [ img [ src "assets/images/mortrem-profile.jpg", alt "test", class "w-full h-full object-cover" ] [] ]
              , div [ class "pt-4 md:pt-6 lg:pt-0 lg:w-3/5 text-white text-md leading-relaxed" ] [ text bioText3 ]
              ]
        ]


performanceHistoryPanel : Model -> Html Msg
performanceHistoryPanel model =
    let
        items = visiblePerformances model
        totalAvailable =
            performances |> List.filter (\p -> not p.hide) |> List.length

        canLoadMore = model.visiblePerfCount < totalAvailable

        card : Int -> Performance -> Html Msg
        card idx perf =
            let
                isOpen = Set.member idx model.expandedPerf

                dateStr = formatDateLocal model.zone perf.datetime
                timeStr = formatTimeLocalHHMM model.zone perf.datetime

                venueTitle =
                    perf.venue.name
                        ++ " — "
                        ++ perf.venue.city
                        ++ " • cap "
                        ++ String.fromInt perf.venue.capacity
                        ++ " • "
                        ++ String.fromInt perf.venue.distanceFromHomeKm
                        ++ " km"

                pill cls txt =
                    span [ class ("px-2 py-0.5 rounded-full text-xs " ++ cls) ] [ text txt ]

                merchUnitsSold =
                    totalUnits perf.merchSold

                unitsSuffix units =
                    if units == 1 then "unit" else "units"

                merchSoldPill : Performance -> Html Msg
                merchSoldPill p =
                    let units = merchUnitsSold
                        class = pillClassForAmount units
                        suffix = unitsSuffix units
                        label = "Merch Sold: " ++ String.fromInt units ++ " " ++ suffix
                    in
                    if totalUnits p.merchSold <= 0
                    then text ""
                    else pill class label
            in
            div
                [ class
                    (String.join " "
                        [ "rounded-2xl bg-slate-900/60 ring-1 ring-white/10 text-white"
                        , "shadow-xl overflow-hidden mb-4 md:mb-3"
                        ]
                    )
                ]
                [ -- clickable header
                  div
                    [ class
                        (String.join " "
                            [ "w-full flex items-center gap-4 px-4 py-3 cursor-pointer select-none"
                            , "hover:bg-white/5"
                            ]
                        )
                    , onClick (TogglePerformance idx)
                    ]
                    [ -- date/time
                      div [ class "min-w-[5rem]" ]
                        [ div [ class "text-sm text-white/80" ] [ text dateStr ]
                        , div [ class "text-xs text-white/60" ] [ text timeStr ]
                        ]
                    , -- venue + lineup
                      div [ class "flex-1" ]
                        [ div [ class "font-medium flex items-center gap-2" ]
                            [ span [ Html.Attributes.title venueTitle ]
                                [ text perf.venue.name ]
                            , pill "ml-3 bg-white/10 text-white/80" <|
                                case perf.position of
                                    Open -> "Open"
                                    Support -> "Support"
                                    Headline -> "Headline"
                            ]
                        , div [ class "mt-1 text-xs text-white/60" ]
                            [ text (perf.venue.city) ]
                        ]
                    , -- caret
                      i
                        [ class
                            (String.join " "
                                [ "fa-solid"
                                , if isOpen then "fa-chevron-up" else "fa-chevron-down"
                                , "text-white/70"
                                ]
                            )
                        ] []
                    ]

                , -- compact stats row
                  div [ class "px-4 pb-3" ]
                    [ div [ class "flex flex-wrap gap-2 text-xs text-white/80" ]
                        [ pill "bg-sky-500/15 text-sky-200 ring-1 ring-sky-500/20"
                            ("Total Draw: " ++ String.fromInt perf.totalDraw)
                        , pill "bg-sky-500/15 text-sky-200 ring-1 ring-sky-500/20"
                            ("Our Draw: " ++ String.fromInt perf.ourDraw)
                        , merchSoldPill perf
                        ]
                    ]
                , -- expandable details
                  div
                    [ class
                        (String.join " "
                            [ "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden"
                            , if isOpen then "opacity-100 max-h-[800px]" else "opacity-0 max-h-0"
                            ]
                        )
                    ]
                    [ div [ class "px-4 pb-4 pt-1 text-sm text-white/85 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2" ]
                        [ row "Date" dateStr
                        , row "Time" timeStr
                        , row "Venue" (perf.venue.name ++ " (" ++ perf.venue.city ++ ")")
                        , row "Distance From Home" (String.fromInt perf.venue.distanceFromHomeKm ++ " km")
                        , row "Total Draw" (String.fromInt perf.totalDraw)
                        , row "Venue Capacity" (String.fromInt perf.venue.capacity)
                        , row "Our Draw" (String.fromInt perf.ourDraw)
                        , row "Lineup Position"
                            (case perf.position of
                                Open -> "Open"
                                Support -> "Support"
                                Headline -> "Headline"
                            )
                        , row "Set Length" (String.fromInt perf.durationMinutes ++ " min")
                        , row "Merch Sold" (String.fromInt merchUnitsSold ++ " " ++ unitsSuffix merchUnitsSold)
                        , row "Shirts Sold" (String.fromInt perf.merchSold.shirts)
                        , row "Stickers Sold" (String.fromInt perf.merchSold.stickers)
                        ]
                    ]
                ]
        -- small helper for detail rows
        row : String -> String -> Html Msg
        row label value =
            div [ class "flex items-baseline gap-3" ]
                [ div [ class "w-40 text-white/60" ] [ text label ]
                , div [ class "flex-1 font-medium" ] [ text value ]
                ]
    in
    div [ id "performance-history", class "pt-8 md:pt-16 lg:px-16 xl:px-32" ]
        [ h1 [ class "text-lg md:text-xl text-white font-bold mb-4 md:mb-6" ] [ text "Performance History" ]

        , -- list of cards
          div [] (items |> List.indexedMap card)

        , -- Load more
          if canLoadMore then
              let
                  step = if model.viewportW < 768 then 3 else 5
              in
              div [ class "mt-6 flex justify-center" ]
                [ button
                    [ class "px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white ring-1 ring-white/15"
                    , onClick LoadMorePerformances
                    ]
                    [ text ("Load " ++ String.fromInt step ++ " more") ]
                ]
          else
              text ""
        ]

pillClassForAmount : Int -> String
pillClassForAmount amt =
    if amt > 0 then
        "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/20"
    else if amt < 0 then
        "bg-red-500/15 text-red-200 ring-1 ring-red-500/20"
    else
        "bg-white/10 text-white/80 ring-1 ring-white/10"





-- Helpers

formatMoney : Float -> String
formatMoney amount =
    let
        cents = round (amount * 100)
        dollars = cents // 100
        remCents = cents - dollars * 100
        pad2 n = if n < 10 then "0" ++ String.fromInt n else String.fromInt n
    in
    "$" ++ String.fromInt dollars ++ "." ++ pad2 remCents


lineupPositionToString : LineupPosition -> String
lineupPositionToString pos =
    case pos of
        Open -> "Open"
        Support -> "Support"
        Headline -> "Headline"




-- Venue cell with hover info panel
venueCell : Venue -> Html Msg
venueCell v =
    let
        infoItem label value =
            div [ class "flex justify-between gap-4" ]
                [ span [ class "text-white/60" ] [ text label ]
                , span [] [ text value ]
                ]
    in
    span [ class "group relative inline-block" ]
        [ -- visible label
          span [ class "underline decoration-white/20 decoration-dotted underline-offset-2 cursor-help" ]
            [ text v.name ]
        , -- hover card
          div
            [ class
                (String.join " "
                    [ "pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto"
                    , "absolute left-1/2 -translate-x-1/2 mt-2 min-w-[16rem] max-w-[20rem]"
                    , "rounded-lg bg-black/90 text-white p-3 text-xs"
                    , "ring-1 ring-white/10 shadow-2xl z-20"
                    ]
                )
            ]
            [ div [ class "font-semibold mb-1" ] [ text v.name ]
            , infoItem "City" v.city
            , infoItem "Capacity" (String.fromInt v.capacity)
            , infoItem "Distance" (String.fromInt v.distanceFromHomeKm ++ " km")
            ]
        ]

statisticsPanel : Model -> Html Msg
statisticsPanel model =
    let
        -- Use the real performance list as our primary source
        perfs =
            performances |> List.filter (\p -> not p.hide)

        -- MOCKED FEEDS (structured like the real sources you’ll wire later)
        tracks : List TrackStat
        tracks =
            [ { streams = 1200, saves = 80, listeners = 430, repeatListeners = 100 }
            , { streams = 2100, saves = 140, listeners = 680, repeatListeners = 180 }
            , { streams = 1600, saves = 100, listeners = 520, repeatListeners = 140 }
            , { streams = 5484, saves = 320, listeners = 1190, repeatListeners = 360 }
            ]

        socials : List SocialProfile
        socials =
            [ { platform = "Instagram", followers = 545 }
            , { platform = "Spotify", followers = 113 }
            , { platform = "YouTube", followers = 67 }
            ]

        engagement : List EngagementSample
        engagement =
            [ { interactions = 18, reach = 450 }
            , { interactions = 22, reach = 520 }
            , { interactions = 15, reach = 360 }
            , { interactions = 28, reach = 640 }
            , { interactions = 19, reach = 410 }
            , { interactions = 25, reach = 580 }
            , { interactions = 13, reach = 300 }
            ]

        growthSeries : List Int
        growthSeries =
            [ 520, 540, 535, 560, 588, 604, 612 ]

        followerCard =
            Statistics.followerGrowthCard
                { zone = model.zone
                , now = model.now
                , quarters = 8
                , seedFollowers = 0
                , performances = performances
                }
    in
    div [ id "statistics", class "pt-8 md:pt-16 lg:px-16 xl:px-32" ]
        [ h1 [ class "text-xl md:text-2xl text-white font-bold mb-4 md:mb-6" ] [ text "Statistics" ]

        , -- LIVE PERFORMANCE
          h2 [ class "mt-2 mb-2 text-lg md:text-xl text-white/80 font-semibold" ] [ text "Live Performance" ]
        , div [ class "grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" ]
            [ showsPlayedCard model.zone perfs
            , averageDrawCard perfs
            , audienceCaptureCard perfs
            ]

        , -- MERCH
          h2 [ class "mt-6 mb-2 text-lg md:text-xl text-white/80 font-semibold" ] [ text "Merchandising" ]
        , div [ class "grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" ]
            [ ticketsSoldCard perfs
            , merchUnitsCard perfs
            , unitsPerAttendeeCard perfs
            ]

        , -- STREAMING & DIGITAL
          h2 [ class "mt-6 mb-2 text-lg md:text-xl text-white/80 font-semibold" ] [ text "Streaming & Digital" ]
        , div [ class "grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" ]
            [ spotifyFollowersCard socials
            , totalStreamsCard tracks
            , averageSavesPerTrackCard tracks
            , repeatListenRateCard tracks
            ]

        , -- SOCIAL & FAN GROWTH
          h2 [ class "mt-6 mb-2 text-lg md:text-xl text-white/80 font-semibold" ] [ text "Social Media & Fan Growth" ]
        , div [ class "grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" ]
            [ socialFollowerCountCard socials
            , engagementRateCard engagement
            , followerCard
            ]
        ]

-- testimonialsPanel : Model -> Html Msg
-- testimonialsPanel model =
--     let
--         -- you can keep duplication if you want a very long reel; not required for drag
--         cards =
--             model.testimonials |> List.map (testimonialCard model)

--         track =
--             cards ++ cards  -- optional; remove if you don't need extra-long reel
--     in
--     div [ id "testimonials", class "py-8 md:py-16 lg:px-16 xl:px-32 text-white" ]
--         [ h1 [ class "text-lg md:text-xl font-bold mb-4 md:mb-6" ] [ text "Testimonials" ]

--         , globalStyles  -- fine to keep; animation class below is removed

--         , div [ class "relative overflow-hidden" ]
--             [ -- left/right fades stay above the reel
--               div
--                 [ class "pointer-events-none absolute inset-y-0 left-0 w-12 z-10"
--                 , style "background" "linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0))"
--                 ]
--                 []
--             , div
--                 [ class "pointer-events-none absolute inset-y-0 right-0 w-12 z-10"
--                 , style "background" "linear-gradient(270deg, rgba(0,0,0,1), rgba(0,0,0,0))"
--                 ]
--                 []

--               -- ↓↓↓ REPLACE YOUR OLD “track with animate-testimonials” WITH THIS SCROLLER ↓↓↓
--             , div
--                 [ id "testimonial-reel"
--                 , class "overflow-x-auto no-scrollbar select-none cursor-grab active:cursor-grabbing"
--                 , preventDefaultOn "pointerdown"
--                     (Decode.map (\x -> ( BeginTestimonialsDrag x, True ))
--                         (Decode.field "clientX" Decode.float)
--                     )
--                 , on "pointermove" (Decode.map MoveTestimonialsDrag (Decode.field "clientX" Decode.float))
--                 , on "pointerup" (Decode.succeed EndTestimonialsDrag)
--                 , on "pointerleave" (Decode.succeed EndTestimonialsDrag)
--                 ]
--                 [ -- the inner track: flex row, won’t shrink
--                   div
--                     [ class "flex gap-4 items-stretch min-w-max"
--                       -- NOTE: no 'animate-testimonials' here
--                     ]
--                     track
--                 ]
--               -- ↑↑↑ END REPLACEMENT ↑↑↑
--             ]
--         , lightboxView model
--         ]

testimonialsPanel : Model -> Html Msg
testimonialsPanel model =
    let
        -- Build the cards once, then duplicate for seamless looping
        cards =
            model.testimonials |> List.map (testimonialCard model)

        track =
            cards ++ cards

        pausedCls =
            if model.lightbox /= Nothing then "paused" else ""
    in
    div [ id "testimonials", class "py-8 md:py-16 lg:px-16 xl:px-32 text-white" ]
        [ h1 [ class "text-lg md:text-xl font-bold mb-4 md:mb-6" ] [ text "Testimonials" ]

        , globalStyles  -- keeps the keyframes + animation class

        , div [ class "relative overflow-hidden testimonials-hover-pause" ]
            [ -- soft edge fades (optional)
              div
                [ class "pointer-events-none absolute inset-y-0 left-0 w-12 z-10"
                , style "background" "linear-gradient(90deg, rgba(0,0,0,1), rgba(0,0,0,0))"
                ]
                []
            , div
                [ class "pointer-events-none absolute inset-y-0 right-0 w-12 z-10"
                , style "background" "linear-gradient(270deg, rgba(0,0,0,1), rgba(0,0,0,0))"
                ]
                []

            , -- The auto-scrolling track
              div
                [ class
                    (String.join " "
                        [ "flex gap-4 items-stretch will-change-transform"
                        , "min-w-max"
                        , "animate-testimonials " ++ pausedCls
                        ]
                    )
                ]
                track
            ]

        , lightboxView model
        ]


globalStyles : Html msg
globalStyles =
    Html.node "style" []
        [ text """
@keyframes testimonials-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.animate-testimonials { animation: testimonials-scroll 45s linear infinite; }
.animate-testimonials:hover { animation-play-state: paused; }
.paused { animation-play-state: paused !important; }
.testimonials-hover-pause:hover .animate-testimonials { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .animate-testimonials { animation: none; }
}
""" ]

testimonialCard : Model -> Testimonial -> Html Msg
testimonialCard model t =
    let
        thumb =
            case t.media of
                LbImage i -> { url = i.src, alt = i.alt }
                LbYoutube mv -> { url = youtubeThumb mv, alt = mv.title }

        -- full text for the lightbox (you can style/format more richly if you want)
        fullText =
            let
                dateStr = formatDateLocal model.zone t.quotedAt
                timeStr = formatTimeLocalHHMM model.zone t.quotedAt
                meta = "— " ++ t.author ++ " • " ++ dateStr ++ " " ++ timeStr
            in
            t.quote ++ "\n\n" ++ meta

        openLb payload =
            OpenLightbox payload
    in
    div [ class "min-w-[18rem] max-w-[22rem] rounded-2xl bg-slate-900/60 ring-1 ring-white/10 text-white shadow-xl overflow-hidden" ]
        [ -- media thumb (click -> lightbox)
          button
            [ class "block relative w-full"
            , onClick <|
                openLb
                    { media = t.media
                    , caption = Just t.author
                    , extraText = Just fullText
                    }
            ]
            [ img
                [ src thumb.url
                , alt thumb.alt
                , class "w-full h-48 md:h-56 object-cover transition hover:opacity-90"
                , Html.Attributes.attribute "draggable" "false"
                ]
                []
            ]
        , -- quote (preview: 5 lines)
          button
            [ class "block text-left p-3 w-full"
            , onClick <|
                openLb
                    { media = t.media
                    , caption = Just t.author
                    , extraText = Just fullText
                    }
            ]
            [ p
                [ class "text-sm leading-relaxed"
                , style "display" "-webkit-box"
                , style "-webkit-line-clamp" "5"
                , style "-webkit-box-orient" "vertical"
                , style "overflow" "hidden"
                ]
                [ text t.quote ]
            , div [ class "mt-2 text-xs text-white/60" ]
                [ let
                    dateStr = formatDateLocal model.zone t.quotedAt
                    timeStr = formatTimeLocalHHMM model.zone t.quotedAt
                  in
                  text (dateStr ++ " " ++ timeStr)
                ]
            ]
        ]

lightboxView : Model -> Html Msg
lightboxView model =
    case model.lightbox of
        Nothing ->
            text ""

        Just lb ->
            let
                stopClick : Html.Attribute Msg
                stopClick =
                    stopPropagationOn "click" (Decode.succeed ( NoOp, True ))

                mediaView =
                    case lb.media of
                        LbImage imgData ->
                            img
                                [ src imgData.src
                                , alt imgData.alt
                                , class "w-full max-h-[70vh] object-contain rounded-xl"
                                , stopClick
                                ]
                                []

                        LbYoutube yt ->
                            div [ class "w-full aspect-video", stopClick ]
                                [ Html.node "iframe"
                                    [ attribute "src" (youtubeEmbedUrl yt.youtubeId)
                                    , attribute "title" yt.title
                                    , class "w-full h-full rounded-xl"
                                    , attribute "frameborder" "0"
                                    , attribute "allow" "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    , attribute "allowfullscreen" ""
                                    , attribute "referrerpolicy" "strict-origin-when-cross-origin"
                                    ]
                                    []
                                ]

                captionView =
                    case lb.caption of
                        Nothing -> text ""
                        Just c ->
                            div [ class "mt-2 text-white/70 text-sm", stopClick ] [ text c ]

                textView =
                    case lb.extraText of
                        Nothing ->
                            text ""

                        Just s ->
                            div
                                [ class "mt-3 max-h-[24vh] overflow-y-auto text-sm leading-relaxed text-white/85 pr-1"
                                , stopClick
                                ]
                                [ text s ]
            in
            div
                [ class "fixed inset-0 z-[2000] bg-black/80 p-4 flex items-center justify-center"
                , onClick CloseLightbox
                ]
                [ -- dialog
                  div
                    [ class "w-[92vw] max-w-5xl"
                    , stopClick
                    ]
                    [ mediaView, captionView, textView ]
                , -- close button
                  button
                  [ class "absolute top-4 right-4 w-10 h-10 rounded-full bg-black hover:bg-black ring-1 ring-white/20 hover:ring-white/35 text-white text-2xl leading-none"
                  , Html.Events.stopPropagationOn "click" (Decode.succeed ( CloseLightbox, True ))
                  , Html.Attributes.attribute "aria-label" "Close lightbox"
                  ]
                  [ text "×" ]
                ]

-- lightboxView : Model -> Html Msg
-- lightboxView model =
--     case model.lightbox of
--         Nothing ->
--             text ""

--         Just t ->
--             div
--                 [ class "fixed inset-0 z-[1200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" ]
--                 [ -- close button
--                   button
--                     [ class "absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white ring-1 ring-white/20 flex items-center justify-center"
--                     , onClick CloseLightbox
--                     , attribute "aria-label" "Close image"
--                     ]
--                     [ i [ class "fa-solid fa-xmark text-lg" ] [] ]
--                 , -- image + caption
--                   div [ class "max-w-5xl w-full" ]
--                     [ div [ class "relative w-full aspect-video rounded-xl overflow-hidden ring-1 ring-white/20 bg-black" ]
--                         [ img [ src t.image, alt "Testimonial", class "absolute inset-0 w-full h-full object-contain" ] [] ]
--                     , div [ class "mt-3 text-sm text-white/80 flex items-center justify-between" ]
--                         [ span [] [ text t.author ]
--                         , let
--                             dateStr = formatDateLocal model.zone t.when_
--                             timeStr = formatTimeLocalHHMM model.zone t.when_
--                           in
--                           span [] [ text (dateStr ++ " · " ++ timeStr) ]
--                         ]
--                     ]
--                 ]

colrowspan : Int -> Int -> String
colrowspan col row = "col-span-" ++ String.fromInt col ++ " " ++ "row-span-" ++ String.fromInt row

imageGalleryClasses : Int -> Int -> String
imageGalleryClasses col row = colrowspan col row

-- galleryImageComponent : GalleryImage -> Html Msg
-- galleryImageComponent galleryImage =
--     img [ src galleryImage.image.src
--         , class (imageGalleryClasses galleryImage.colSpan galleryImage.rowSpan)
--         ] []

galleryImageComponent : GalleryImage -> Html Msg
galleryImageComponent g =
    let
        i = g.image
        cs = g.colSpan
        rs = g.rowSpan
    in
    img
        [ src i.src
        , alt i.alt
        , class ("col-span-12 sm:col-span-" ++ String.fromInt cs ++ " row-span-12 sm:row-span-" ++ String.fromInt rs ++ " cursor-pointer object-cover transform hover:scale-[1.03] transition")
        , onClick
              (OpenLightbox
                   (LightboxDetails
                        (LbImage { src = i.src, alt = i.alt })
                        Nothing
                        Nothing
                   )
              )
        ]
        []

imageGallery : List GalleryImage -> Html Msg
imageGallery images =
    div [ id "gallery", class "w-full py-8 md:py-16 overflow-hidden" ]
        [ div [ class "grid grid-cols-12 overflow-hidden" ]
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


youtubeEmbedUrl : String -> String
youtubeEmbedUrl ytId =
    "https://www.youtube.com/embed/"
        ++ ytId
        ++ "?rel=0&modestbranding=1&playsinline=1"

youtubeThumb : YoutubeVideo -> String
youtubeThumb mv =
    if String.length mv.thumbnail > 0 then
        mv.thumbnail
    else
        "https://img.youtube.com/vi/" ++ mv.youtubeId ++ "/hqdefault.jpg"


web3RespDecoder : Decoder Web3Resp
web3RespDecoder =
    Decode.map2 Web3Resp
        (Decode.field "success" Decode.bool)
        (Decode.field "message" Decode.string)


encodeContact : ContactForm -> Encode.Value
encodeContact c =
    Encode.object
        [ ( "access_key", Encode.string web3formsAccessKey )
        , ( "from_name", Encode.string c.name )
        , ( "from_email", Encode.string c.email )
        , ( "subject", Encode.string ("New EPK message from " ++ c.name) )
        , ( "message", Encode.string c.message )
        , ( "botcheck", Encode.string c.honeypot ) -- honeypot field
        ]


postContact : ContactForm -> Cmd Msg
postContact c =
    Http.post
        { url = web3formsEndpoint
        , body = Http.jsonBody (encodeContact c)
        , expect = Http.expectJson ContactSent web3RespDecoder
        }


httpErrorToString : Http.Error -> String
httpErrorToString err =
    case err of
        Http.BadUrl _ -> "Bad URL."
        Http.Timeout -> "Request timed out."
        Http.NetworkError -> "Network error."
        Http.BadStatus _ -> "Server returned an error."
        Http.BadBody _ -> "Could not read server response."


contactForm : Model -> Html Msg
contactForm model =
    let
        inputBase =
            "w-full px-3 py-2 rounded-md bg-white/10 text-white placeholder-white/50 outline-none ring-1 ring-white/10 focus:ring-white/30"

        -- Failure modal shown when ContactError
        failureModal =
            case model.contactStatus of
                ContactError msg ->
                    Just <|
                        div [ class "mt-4 p-3 rounded-md bg-red-500/10 ring-1 ring-red-400/30 text-red-200" ]
                            [ p [ class "text-sm" ] [ text ("We couldn't send your message: " ++ msg ++ " Try again or email us directly: ") ]
                            , div [ class "mt-3 flex items-stretch gap-2" ]
                                [ input
                                    [ class (inputBase ++ " flex-1 bg-black/20")
                                    , Html.Attributes.value bandEmail
                                    , Html.Attributes.readonly True
                                    ]
                                    []
                                , button
                                    [ class "px-3 rounded-md bg-white/15 hover:bg-white/25"
                                    , onClick CopyBandEmail
                                    ]
                                    [ i [ class "fa-regular fa-copy" ] [] ]
                                ]
                            , div [ class "mt-3" ]
                                [ button
                                    [ class "px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20"
                                    , onClick DismissContactModal
                                    ]
                                    [ text "Close" ]
                                ]
                            ]
                _ ->
                    Nothing

        successNote =
            case model.contactStatus of
                ContactSuccess ->
                    Just <|
                        div [ class "mt-4 p-3 rounded-md bg-emerald-500/10 ring-1 ring-emerald-400/30 text-emerald-200" ]
                            [ text "Thanks! We received your message and will reply soon." ]
                _ ->
                    Nothing
    in
    div []
        ([ div [ class "grid grid-cols-1 md:grid-cols-2 gap-3" ]
            [ input
                [ class inputBase
                , Html.Attributes.placeholder "Your name"
                , Html.Events.onInput UpdateContactName
                , Html.Attributes.value model.contact.name
                ]
                []
            , input
                [ class inputBase
                , Html.Attributes.placeholder "you@example.com"
                , Html.Events.onInput UpdateContactEmail
                , Html.Attributes.type_ "email"
                , Html.Attributes.value model.contact.email
                ]
                []
            , textarea
                [ class (inputBase ++ " md:col-span-2 min-h-[120px]")
                , Html.Attributes.placeholder "Tell us about the show, date, etc."
                , Html.Events.onInput UpdateContactMessage
                , Html.Attributes.value model.contact.message
                ]
                [ text model.contact.message ]
            , input
                [ class "hidden"
                , Html.Attributes.placeholder "Leave empty"
                , Html.Events.onInput UpdateContactHoneypot
                , Html.Attributes.value model.contact.honeypot
                , Html.Attributes.autocomplete False
                ]
                []
            ]
          , div [ class "mt-3 flex items-center gap-3" ]
            [ button
                [ class
                    (case model.contactStatus of
                        ContactSending ->
                            "px-4 py-2 rounded-md bg-white/20 cursor-wait"

                        _ ->
                            "px-4 py-2 rounded-md bg-white/10 hover:bg-white/20"
                    )
                , onClick SubmitContact
                ]
                [ case model.contactStatus of
                    ContactSending -> text "Sending…"
                    _ -> text "Send"
                ]
            , small [ class "text-white/60" ] [ text "We’ll never share your info." ]
            ]
          ]
            ++ (case successNote of
                    Just n -> [ n ]
                    Nothing -> []
               )
            ++ (case failureModal of
                    Just m -> [ m ]
                    Nothing -> []
               )
        )


footer : Model -> Html Msg
footer model =
    div
    [ id "footer", class "relative w-full py-10 md:py-14 px-6 md:px-12 backdrop-blur-xl bg-black/60 ring-1 ring-white/10"
    ]
    [ div [ class "mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 text-white" ]
          [ -- Left: Socials
                div []
                [ h3 [ class "uppercase text-sm tracking-wider text-white/70 mb-3" ] [ text "Follow us" ]
                , div [ class "flex items-center gap-4 text-2xl" ]
                    [ a [ href "https://open.spotify.com/artist/1z9AQTlfG5SjjDtKf1r2Mt", target "_blank", class "hover:text-white/70" ] [ i [ class "fa-brands fa-spotify" ] [] ]
                    , a [ href "https://music.apple.com/ca/artist/mortrem/1723532370", target "_blank", class "hover:text-white/70" ] [ i [ class "fa-brands fa-apple" ] [] ]
                    , a [ href "https://www.youtube.com/channel/UCLaZTiER4UOVGzsCV50tbfA", target "_blank", class "hover:text-white/70" ] [ i [ class "fa-brands fa-youtube" ] [] ]
                    , a [ href "https://instagram.com/mortremband", target "_blank", class "hover:text-white/70" ] [ i [ class "fa-brands fa-instagram" ] [] ]
                    , a [ href "https://tiktok.com/@mortremband", target "_blank", class "hover:text-white/70" ] [ i [ class "fa-brands fa-tiktok" ] [] ]
                    ]
                , hr [ class "my-6 border-white/10" ] []
                , h3 [ class "uppercase text-sm tracking-wider text-white/70 mb-3" ] [ text "Contact" ]
                , contactForm model
                ]
          , -- Right: Resources
              div [ class "md:ml-auto md:justify-self-end md:text-right" ]
                  [ h3 [ class "uppercase text-sm tracking-wider text-white/70 mb-3 md:text-right" ]
                        [ text "Resources" ]
                  , ul [ class "space-y-2 md:text-right" ]
                      [ li [] [ a [ href "/docs/tech-rider.pdf", class "hover:underline" ] [ text "Tech Rider" ] ]
                      , li [] [ a [ href "/docs/stage-plot.pdf", class "hover:underline" ] [ text "Stage Plot" ] ]
                      , li [] [ a [ href "/docs/press-kit.zip", class "hover:underline" ] [ text "Press Kit" ] ]
                      , li [] [ a [ href "/docs/other.pdf", class "hover:underline" ] [ text "Other Resources" ] ]
                      ]
                  ]
          ]
    ]

measureMarkersCmd : List String -> Cmd Msg
measureMarkersCmd ids =
    let
        -- Measure one marker; on failure, drop it (do not fail the whole batch)
        measureOne id =
            Dom.getElement id
                |> Task.map (\el -> Just ( id, el.element.y ))
                |> Task.onError (\_ -> Task.succeed Nothing)
    in
    ids
        |> List.map measureOne
        |> Task.sequence
        |> Task.map (List.filterMap identity)
        |> Task.perform MarkersMeasured


visiblePerformances : Model -> List Performance
visiblePerformances model =
    performances
        |> List.filter (\p -> not p.hide)
        |> List.sortBy (\p -> -(DateTime.toPosix p.datetime |> Time.posixToMillis)) -- newest first
        |> List.take model.visiblePerfCount


clickableImage :
    { src : String, alt : String, caption : Maybe String, extraText : Maybe String, classes : String }
    -> Html Msg
clickableImage cfg =
    img
        [ src cfg.src
        , alt cfg.alt
        , class (cfg.classes ++ " cursor-zoom-in transition hover:opacity-90")
        , onClick <|
            OpenLightbox
                { media = LbImage { src = cfg.src, alt = cfg.alt }
                , caption = cfg.caption
                , extraText = cfg.extraText
                }
        ]
        []


-- BOOTSTRAP
main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
