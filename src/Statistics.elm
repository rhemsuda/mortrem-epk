module Statistics
    exposing
        ( TrackStat
        , SocialProfile
        , EngagementSample
        , StreamingMetrics
        , showsPlayedCard
        , averageDrawCard
        , audienceCaptureCard
        , ticketsSoldCard
        , merchUnitsCard
        , unitsPerAttendeeCard
        , totalStreamsCard
        , spotifyFollowersCard
        , averageSavesPerTrackCard
        , avgStreamsPerListenerCard
        , repeatListenRateCard
        , socialFollowerCountCard
        , engagementRateCard
        --, followerGrowthCurveCard
        , followerGrowthCard
        )

import Html exposing (Html, div, span, text, i, button)
import Html.Attributes as HA
import Svg as S exposing (svg, polyline)
import Svg.Attributes as SA
import Types exposing (..)
import DateTime exposing (DateTime)
import Time exposing (Zone, Posix, Month(..), toMonth, toYear)
import String
import Components exposing (helpHint)
import Utils exposing (sumUnits, roundTo)


-- ──────────────────────────────────────────────────────────────────────────────
-- Source-data models you can later swap with real feeds
-- ──────────────────────────────────────────────────────────────────────────────

type alias TrackStat =
    { streams : Int
    , saves : Int
    , listeners : Int
    , repeatListeners : Int
    }


type alias SocialProfile =
    { platform : String  -- e.g. "Instagram", "Spotify", "YouTube"
    , followers : Int
    }


type alias EngagementSample =
    { interactions : Int
    , reach : Int
    }


type alias StreamingMetrics =
    { year : Int
    , month : Int
    , platform : String
    , numListeners : Int
    , numStreams : Int
    , pctActiveSources : Int
    , pctProgrammedSources : Int
    , numSaves : Int
    , numPlaylistAdds : Int
    , numFollowers : Int
    }


-- ──────────────────────────────────────────────────────────────────────────────
-- Utilities
-- ──────────────────────────────────────────────────────────────────────────────

formatInt : Int -> String
formatInt n =
    -- tiny thousand-separator formatter
    let
        s = String.fromInt n
        go acc rest =
            if String.length rest <= 3 then
                rest :: acc
            else
                let
                    len = String.length rest
                in
                go (String.right 3 rest :: acc) (String.left (len - 3) rest)
    in
    go [] s |> String.join ","


formatMoney : Float -> String
formatMoney amount =
    let
        cents = round (amount * 100)
        dollars = cents // 100
        remCents = abs (cents - dollars * 100)
        pad2 n = if n < 10 then "0" ++ String.fromInt n else String.fromInt n
        sign = if amount < 0 then "-" else ""
    in
    sign ++ "$" ++ formatInt (abs dollars) ++ "." ++ pad2 remCents


percent : Float -> String
percent x =
    (round (x * 100) |> String.fromInt) ++ "%"


safeDiv : Float -> Float -> Float
safeDiv num den =
    if den == 0 then 0 else num / den


avgFloat : List Float -> Float
avgFloat xs =
    case xs of
        [] -> 0
        _ -> List.sum xs / toFloat (List.length xs)


sumBy : (a -> Float) -> List a -> Float
sumBy f items =
    items |> List.map f |> List.sum


yearOf : Zone -> DateTime.DateTime -> Int
yearOf zone dt =
    DateTime.toPosix dt |> Time.toYear zone


-- Base card view
statCard :
    { title : String
    , info : String
    , primary : String
    , secondaryMain : String
    , secondarySuffix : String
    }
    -> Model
    -> Html Msg
statCard args model =
    let
        surfaceCls =
            String.join " "
                [ "rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-xl"
                , "hover:ring-white/20 hover:shadow-2xl"
                , "transition p-4 flex flex-col w-full"
                , "min-h-[180px] overflow-hidden"   -- clipping only the surface
                ]
    in
    -- OUTER: no clipping; anchor tooltip here
    div [ HA.class "relative w-full overflow-visible" ]
        [ -- Card surface (clipped & rounded)
          div [ HA.class surfaceCls ]
            [ -- header (title only; pad right so it doesn't collide with the “i”)
              div [ HA.class "mb-2 pr-8" ]
                [ span [ HA.class "text-md font-semibold tracking-wide text-white/80" ]
                    [ text args.title ]
                ]
            , -- primary metric
              div [ HA.class "flex-1 flex items-center" ]
                [ span [ HA.class "text-5xl font-semibold tracking-tight text-white" ]
                    [ text args.primary ]
                ]
            , -- secondary
              div [ HA.class "pt-2 text-white/70" ]
                [ span [ HA.class "text-xl font-semibold text-white/80" ] [ text args.secondaryMain ]
                , span [ HA.class "ml-2 text-sm" ] [ text args.secondarySuffix ]
                ]
            ]

        , -- Info button + tooltip (sibling of surface; not clipped)
          div [ HA.class "absolute right-3 top-3 z-30" ]
            [ helpHint model
                  { title = args.title
                  , body = args.info
                  }
              -- infoPopover
              --     [ text args.info ]
                -- [ button
                --     [ HA.class
                --         (String.join " "
                --             [ "w-5 h-5 rounded-full flex items-center justify-center"
                --             , "text-[11px] font-bold bg-white/10 text-white/80"
                --             , "ring-1 ring-white/15 cursor-default"
                --             ]
                --         )
                --     , HA.title args.title
                --     ]
                --     [ text "i" ]
                -- , -- shown only when hovering the “i”
                --   div
                --     [ HA.class
                --         (String.join " "
                --             [ "pointer-events-none opacity-0 translate-y-1"
                --             , "group-hover:opacity-100 group-hover:translate-y-0"
                --             , "absolute right-0 mt-2 min-w-[16rem] max-w-[20rem]"
                --             , "bg-black/90 text-white text-xs rounded-lg p-3"
                --             , "ring-1 ring-white/10 shadow-2xl transition"
                --             ]
                --         )
                --     ]
                --     [ text args.info ]
                -- ]
            ]
        ]


infoPopover : List (Html msg) -> Html msg
infoPopover content =
    div [ HA.class "relative inline-block group overflow-visible" ]
        [ -- focusable trigger
          button
            [ HA.class ("inline-flex items-center justify-center w-5 h-5 rounded-full" ++
                     "bg-white/10 ring-1 ring-white/20 text-white/80" ++
                     "focus:outline-none focus:ring-2 focus:ring-white/40")
            , HA.attribute "type" "button"
            , HA.attribute "aria-label" "More info"
            ]
            [ i [ HA.class "fa-solid fa-circle-info text-[11px] leading-none" ] [] ]

        , -- popover (hidden by default; shows on hover OR focus-within)
          div
            [ HA.class ("absolute top-full right-0 mt-2 min-w-[14rem] max-w-[20rem] " ++
                     "rounded-lg bg-black/90 text-white p-3 text-xs ring-1 ring-white/10 shadow-2xl z-50 " ++
                     "opacity-0 pointer-events-none transition " ++
                     "group-hover:opacity-100 group-hover:pointer-events-auto " ++
                     "group-focus-within:opacity-100 group-focus-within:pointer-events-auto")
            ]
            content
        ]


-- ──────────────────────────────────────────────────────────────────────────────
-- LIVE PERFORMANCE
-- ──────────────────────────────────────────────────────────────────────────────

showsPlayedCard : Model -> Zone -> List Performance -> Html Msg
showsPlayedCard model zone perfs =
    let
        visible = List.filter (\p -> not p.hide) perfs
        totalShows = List.length visible
        latestYear =
            visible
                |> List.map (\p -> yearOf zone p.datetime)
                |> List.maximum
                |> Maybe.withDefault 1970
        showsThisYear =
            visible
                |> List.filter (\p -> yearOf zone p.datetime == latestYear)
                |> List.length
    in
    statCard
        { title = "Shows Played"
        , info = "Total shows played (all time) and how many in the most recent calendar year present in your data."
        , primary = formatInt totalShows
        , secondaryMain = formatInt showsThisYear
        , secondarySuffix = "played in " ++ String.fromInt latestYear
        }
        model


averageDrawCard : Model -> List Performance -> Html Msg
averageDrawCard model perfs =
    let
        visible = List.filter (\p -> not p.hide) perfs
        avgDraw =
            visible
                |> List.map (\p -> toFloat p.totalDraw)
                |> avgFloat
                |> round
                |> String.fromInt
    in
    statCard
        { title = "Average Draw"
        , info = "Average total audience per show (includes your draw + organic walk-ins)."
        , primary = avgDraw
        , secondaryMain = (formatInt (List.length visible))
        , secondarySuffix = "shows included"
        }
        model


audienceCaptureCard : Model -> List Performance -> Html Msg
audienceCaptureCard model perfs =
    let
        visible = List.filter (\p -> not p.hide) perfs
        totalNew = visible |> List.map (\p -> toFloat p.newFollowers) |> List.sum
        totalAudience = visible |> List.map (\p -> toFloat p.totalDraw) |> List.sum
        pct = percent (safeDiv totalNew totalAudience)
        fansPerShow =
            safeDiv totalNew (toFloat (List.length visible))
                |> round
                |> String.fromInt
    in
    statCard
        { title = "Audience Capture"
        , info = "New followers captured per audience member across all shows."
        , primary = pct
        , secondaryMain = "~" ++ fansPerShow
        , secondarySuffix = "new fans per show"
        }
        model


-- ──────────────────────────────────────────────────────────────────────────────
-- MERCHANDISING
-- ──────────────────────────────────────────────────────────────────────────────

-- merchTotalSalesCard : List Performance -> Html msg
-- merchTotalSalesCard perfs =
--     let
--         visible = List.filter (\p -> not p.hide) perfs
--         total = sumBy .merchSales visible
--     in
--     statCard
--         { title = "Total Gross Sales"
--         , info = "Sum of merch revenue (gross) across all visible shows."
--         , primary = formatMoney total
--         , secondaryMain = formatInt (List.length visible)
--         , secondarySuffix = "shows reported"
--         }


-- merchAverageSalesCard : List Performance -> Html msg
-- merchAverageSalesCard perfs =
--     let
--         visible = List.filter (\p -> not p.hide) perfs
--         avgSales = safeDiv (sumBy .merchSales visible) (toFloat (List.length visible))
--         perTicket =
--             safeDiv (sumBy .merchSales visible)
--                 (visible |> List.map (\p -> toFloat p.totalDraw) |> List.sum)
--     in
--     statCard
--         { title = "Average Gross Sales"
--         , info = "Average merch revenue (gross) per show, plus per-ticket-holder spend."
--         , primary = formatMoney avgSales
--         , secondaryMain = formatMoney perTicket
--         , secondarySuffix = "per ticket holder"
--         }


-- merchVsTicketCard : List Performance -> Html msg
-- merchVsTicketCard perfs =
--     let
--         visible = List.filter (\p -> not p.hide) perfs
--         merch = sumBy .merchSales visible
--         tickets =
--             visible
--                 |> List.map (\p -> (toFloat p.ourDraw) * p.ticketPrice)
--                 |> List.sum
--         ratio = safeDiv merch tickets
--         moneyPer10 =
--             formatMoney (ratio * 10)
--     in
--     statCard
--         { title = "Merch vs. Ticket Sales"
--         , info = "Gross merch vs. your ticket revenue. Secondary shows how much merch is sold per $10 of ticket revenue."
--         , primary = percent ratio
--         , secondaryMain = moneyPer10
--         , secondarySuffix = "merch per $10 tickets"
--         }

{-| Total tickets sold (uses totalDraw), plus avg per show. -}
ticketsSoldCard : Model -> List Performance -> Html Msg
ticketsSoldCard model perfs =
    let
        shows =
            perfs |> List.filter (\p -> not p.hide)

        totalTickets =
            shows |> List.map .totalDraw |> List.sum

        avgPerShow =
            case List.length shows of
                0 -> 0
                n -> totalTickets // n
    in
    statCard
        { title = "Tickets Sold"
        , info = "Total attendees across shows (Total Draw). Avg is per show."
        , primary = String.fromInt totalTickets
        , secondaryMain = String.fromInt avgPerShow
        , secondarySuffix = "avg / show"
        }
        model

{-| Total merch units (from units feed), plus avg per show. -}
merchUnitsCard : Model -> List Performance -> Html Msg
merchUnitsCard model perfs =
    let
        total = perfs
              |> List.map (.merchSold)
              |> sumUnits

        showCount =
            List.length perfs

        avgPerShow =
            if showCount == 0 then
                0
            else
                total // showCount
    in
    statCard
        { title = "Merch Units Sold"
        , info = "Sum of all physical units (shirts, stickers). Avg is per show."
        , primary = String.fromInt total
        , secondaryMain = String.fromInt avgPerShow
        , secondarySuffix = "avg / show"
        }
        model


{-| Units per attendee = total merch units ÷ total audience. -}
unitsPerAttendeeCard : Model -> List Performance -> Html Msg
unitsPerAttendeeCard model perfs =
    let
        totalUnits_ = perfs
              |> List.map (.merchSold)
              |> sumUnits

        totalAudience =
            perfs
                |> List.filter (\p -> not p.hide)
                |> List.map .totalDraw
                |> List.sum

        ratio : Float
        ratio =
            if totalAudience <= 0 then
                0
            else
                toFloat totalUnits_ / toFloat totalAudience

        ratioStr =
            String.fromFloat (roundTo 2 ratio)
    in
    statCard
        { title = "Units per Attendee"
        , info = "Total merch units divided by total audience across the same period."
        , primary = ratioStr
        , secondaryMain = String.fromInt totalUnits_
        , secondarySuffix = "total units"
        }
        model


-- ──────────────────────────────────────────────────────────────────────────────
-- STREAMING & DIGITAL
-- ──────────────────────────────────────────────────────────────────────────────

totalStreamsCard : Model -> List TrackStat -> Html Msg
totalStreamsCard model tracks =
    let
        total = tracks |> List.map .streams |> List.sum
        avgPerTrack = safeDiv (toFloat total) (toFloat (List.length tracks))
    in
    statCard
        { title = "Total Streams"
        , info = "Sum of streams across all tracks"
        , primary = formatInt total
        , secondaryMain = formatInt (round avgPerTrack)
        , secondarySuffix = "avg streams per track"
        }
        model


avgStreamsPerListenerCard : Model -> List TrackStat -> Html Msg
avgStreamsPerListenerCard model tracks =
    statCard
        { title = "Average Streams Per Listener"
        , info = "The average streams per listener is counted from most recent release (September 2024) until now. This calculation purposely leaves out the surge of listeners on release day, and looks at retention over time."
        , primary = "4.1"
        , secondaryMain = "64%"
        , secondarySuffix = "higher than industry average"
        }
        model

spotifyFollowersCard : Model -> List SocialProfile -> Html Msg
spotifyFollowersCard model profiles =
    let
        spotify =
            profiles
                |> List.filter (\p -> String.toLower p.platform == "spotify")
                |> List.head
        total =
            case spotify of
                Just s -> s.followers
                Nothing -> 0
    in
    statCard
        { title = "Spotify Followers"
        , info = "Current followers on Spotify artist profile."
        , primary = formatInt total
        , secondaryMain = "~8" -- update this to real calculation - manually calculated for now
        , secondarySuffix = "per month"
        }
        model


averageSavesPerTrackCard : Model -> List TrackStat -> Html Msg
averageSavesPerTrackCard model tracks =
    let
        avgSaves =
            safeDiv
                (tracks |> List.map (\t -> toFloat t.saves) |> List.sum)
                (toFloat (List.length tracks))
    in
    statCard
        { title = "Average Saves per Track"
        , info = "Average number of saves across all tracks."
        , primary = formatInt (round avgSaves)
        , secondaryMain = "+38%" -- update this to a real calculation - manually calculated for now
        , secondarySuffix = "from last release"
        }
        model


repeatListenRateCard : Model -> List TrackStat -> Html Msg
repeatListenRateCard model tracks =
    let
        totalListeners = tracks |> List.map .listeners |> List.sum |> toFloat
        totalRepeats = tracks |> List.map .repeatListeners |> List.sum |> toFloat
        rate = safeDiv totalRepeats totalListeners
    in
    statCard
        { title = "Repeat Listen Rate"
        , info = "Share of listeners who listened to a track more than once."
        , primary = percent rate
        --, secondaryMain = (round (rate * 100) |> String.fromInt) ++ "%"
        , secondaryMain = "~3.6"
        , secondarySuffix = "streams per listener"
        }
        model


-- ──────────────────────────────────────────────────────────────────────────────
-- SOCIAL & FAN GROWTH
-- ──────────────────────────────────────────────────────────────────────────────

socialFollowerCountCard : Model -> List SocialProfile -> Html Msg
socialFollowerCountCard model profiles =
    let
        total = profiles |> List.map .followers |> List.sum
        topPlatform =
            profiles
                |> List.sortBy (\p -> -p.followers)
                |> List.head
        secondary =
            case topPlatform of
                Just p ->
                    let
                        pct = safeDiv (toFloat p.followers) (toFloat total)
                    in
                        String.fromInt (round (pct * 100)) ++ "%"
                Nothing ->
                    ""
        suffix =
            case topPlatform of
                Just p ->
                    "follow on " ++ p.platform
                Nothing ->
                    "no platforms connected"
    in
    statCard
        { title = "Follower Count"
        , info = "Sum of followers across connected social profiles. Secondary shows where most followers are."
        , primary = formatInt total
        , secondaryMain = secondary
        , secondarySuffix = suffix
        }
        model


engagementRateCard : Model -> List EngagementSample -> Html Msg
engagementRateCard model samples =
    let
        totalInteractions = samples |> List.map .interactions |> List.sum |> toFloat
        totalReach = samples |> List.map .reach |> List.sum |> toFloat
        rate = safeDiv totalInteractions totalReach
        avgDailyInteractions =
            safeDiv totalInteractions (toFloat (List.length samples))
                |> round
                |> String.fromInt
    in
    statCard
        { title = "Engagement Rate"
        , info = "Interactions divided by reach across recent posts."
        , primary = percent rate
        , secondaryMain = avgDailyInteractions
        , secondarySuffix = "avg daily interactions"
        }
        model

-- followerGrowthCard :
--     { zone : Zone
--     , now : Posix
--     , quarters : Int
--     , seedFollowers : Int
--     , performances : List Performance
--     }
--     -> Html Msg
-- followerGrowthCard cfg =
--     let
--         --series =
--         --    quarterlyFollowerSeries cfg.zone cfg.now cfg.quarters cfg.seedFollowers cfg.performances
--         series =
--             -- [ ("Q3 23", 41)
--             -- , ("Q4 23", 26)
--             -- , ("Q1 24", 92)
--             -- , ("Q2 24", 43)
--             -- , ("Q3 24", 34)
--             -- , ("Q4 24", 51)
--             -- , ("Q1 25", 137)
--             -- , ("Q2 25", 104)
--             -- , ("Q3 25", 27)
--             -- ]
--             [ ("Q3 23", 41)
--             , ("Q4 23", 67)
--             , ("Q1 24", 159)
--             , ("Q2 24", 202)
--             , ("Q3 24", 236)
--             , ("Q4 24", 287)
--             , ("Q1 25", 424)
--             , ("Q2 25", 528)
--             , ("Q3 25", 555)
--             ]

--         avgGainPerQ =
--             let gains = series |> List.map Tuple.second |> quarterGains
--             in if List.isEmpty gains then 0 else (List.sum gains) // List.length gains

--         spark =
--             sparkline
--                 { w = 260, h = 96, pad = 10 }
--                 series
--     in
--     div
--         [ HA.class
--             (String.join " "
--                 [ "relative rounded-2xl bg-slate-900/60"
--                 , "ring-1 ring-white/10 shadow-xl"
--                 , "hover:ring-white/20 hover:shadow-2xl"
--                 , "transition p-4 flex flex-col w-full"
--                 , "min-h-[180px] overflow-hidden"
--                 ]
--             )
--         ]
--         [ -- header
--           div [ HA.class "flex items-start justify-between mb-2" ]
--             [ span [ HA.class "text-md font-semibold tracking-wide text-white/80" ]
--                 [ text "Follower Growth" ]
--             ,
--               div [ HA.class "relative group" ]
--                 [ button
--                     [ HA.class
--                         (String.join " "
--                             [ "w-5 h-5 rounded-full flex items-center justify-center"
--                             , "text-[11px] font-bold bg-white/10 text-white/80"
--                             , "ring-1 ring-white/15 cursor-default"
--                             ]
--                         )
--                     , HA.title "Follower Growth"
--                     ]
--                     [ text "i" ]
--                 , div
--                     [ HA.class
--                         (String.join " "
--                             [ "pointer-events-none opacity-0 group-hover:opacity-100"
--                             , "absolute right-0 mt-2 z-20 min-w-[16rem] max-w-[20rem]"
--                             , "bg-black/90 text-white text-xs rounded-lg p-3"
--                             , "ring-1 ring-white/10 shadow-2xl transition"
--                             ]
--                         )
--                     ]
--                     [ text "Each point is the follower count at the END of the quarter (Q1–Q4) in your local time. Gains per quarter are computed from summed performance ‘newFollowers’ plus your starting seed." ]
--                 ]
--             ]
--         ,
--           div [ HA.class "mt-3 h-24 w-full" ]
--             [ spark ]
--         ,
--           div [ HA.class "pt-2 text-white/70" ]
--             [ span [ HA.class "text-xl font-semibold text-white/80" ]
--                 [ text (String.fromInt avgGainPerQ) ]
--             , span [ HA.class "ml-2 text-sm" ] [ text "avg per quarter" ]
--             ]
--         ]



followerGrowthCard :
    Model
    -> { zone : Zone
       , now : Posix
       , quarters : Int
       , seedFollowers : Int
       , performances : List Performance
       }
    -> Html Msg
followerGrowthCard model cfg =
    let
        series =
            [ ("Q3 23", 41)
            , ("Q4 23", 67)
            , ("Q1 24", 159)
            , ("Q2 24", 202)
            , ("Q3 24", 236)
            , ("Q4 24", 287)
            , ("Q1 25", 424)
            , ("Q2 25", 528)
            , ("Q3 25", 555)
            ]

        avgGainPerQ =
            let
                gains = series |> List.map Tuple.second |> quarterGains
            in
            if List.isEmpty gains then 0 else (List.sum gains) // List.length gains

        spark =
            sparkline
                { w = 260, h = 96, pad = 10 }
                series
    in
    div
        [ HA.class
            (String.join " "
                [ "relative rounded-2xl bg-slate-900/60"
                , "ring-1 ring-white/10 shadow-xl"
                , "hover:ring-white/20 hover:shadow-2xl"
                , "transition p-4 flex flex-col w-full"
                , "min-h-[180px] overflow-visible"  -- was overflow-hidden
                ]
            )
        ]
        [ -- header
          div [ HA.class "flex items-start justify-between mb-2 overflow-visible" ]
            [ span [ HA.class "text-md font-semibold tracking-wide text-white/80" ]
                [ text "Follower Growth" ]
            , helpHint model
                { title = "Follower Growth"
                , body =
                    ("Each point is the follower count at the END of the quarter (Q1–Q4) " ++
                    "in your local time. Gains per quarter are computed from summed " ++
                    "performance 'newFollowers' plus your starting seed.")
                }
            ]
        ,
          div [ HA.class "mt-3 h-24 w-full" ]
            [ spark ]
        ,
          div [ HA.class "pt-2 text-white/70" ]
            [ span [ HA.class "text-xl font-semibold text-white/80" ]
                [ text (String.fromInt avgGainPerQ) ]
            , span [ HA.class "ml-2 text-sm" ] [ text "avg per quarter" ]
            ]
        ]





{-| Compute cumulative follower counts at the end of each of the last `quarters`
    quarters, oldest → newest.

    We derive gains per quarter from performances.newFollowers, grouped by quarter,
    and add them to `seedFollowers`.
-}
quarterlyFollowerSeries :
    Zone -> Posix -> Int -> Int -> List Performance -> List ( String, Int )
quarterlyFollowerSeries zone now quarters seed performances =
    let
        bins : List ( Int, Int )
        bins =
            lastNQuarters zone now quarters

        gainsByBin : (Int, Int) -> Int
        gainsByBin (y, q) =
            performances
                |> List.filter (\p -> inQuarter zone p.datetime (y, q))
                |> List.map .newFollowers
                |> List.sum

        gains : List Int
        gains =
            bins |> List.map gainsByBin

        cumul : List Int
        cumul =
            cumulative seed gains

        labels : List String
        labels =
            bins |> List.map (\(y, q) -> quarterLabel y q)
    in
    List.map2 Tuple.pair labels cumul


-- VIEW HELPERS ----------------------------------------------------

infoBubble : String -> Html msg
infoBubble hint =
    let
        base =
            "relative group inline-flex items-center justify-center w-5 h-5 rounded-full " ++
            "bg-white/10 ring-1 ring-white/15 text-white/80"
    in
    div [ HA.class base ]
        [ i [ HA.class "fa-regular fa-circle-question text-[12px]" ] []
        , div
            [ HA.class
                ("pointer-events-none absolute left-1/2 -translate-x-1/2 top-[115%] " ++
                 "opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto " ++
                 "min-w-[16rem] max-w-[22rem] rounded-md p-3 text-xs " ++
                 "bg-black/90 ring-1 ring-white/10 shadow-2xl z-20")
            ]
            [ text hint ]
        ]


sparkline :
    { w : Float, h : Float, pad : Float }
    -> List ( String, Int )                 -- (label, value), oldest → newest
    -> Html msg
sparkline dims series =
    let
        w = dims.w
        h = dims.h
        p = dims.pad

        values =
            series |> List.map Tuple.second

        (minV, maxV) =
            case values of
                [] ->
                    (0, 1)

                _  ->
                    let
                        lo = List.minimum values |> Maybe.withDefault 0
                        hi = List.maximum values |> Maybe.withDefault lo
                    in
                    if hi == lo then
                        (lo - 1, hi + 1)
                    else
                        (lo, hi)

        xs : List Float
        xs =
            let
                n = max 1 (List.length series - 1) |> toFloat
                step = (w - 2 * p) / n
            in
            List.indexedMap (\i _ -> p + step * toFloat i) series

        scaleY v =
            let
                t = (toFloat (v - minV)) / (toFloat (maxV - minV))
            in
            -- invert because SVG y=0 is top
            p + (h - 2 * p) * (1 - t)

        ys : List Float
        ys =
            values |> List.map scaleY

        points : List ( Float, Float )
        points =
            List.map2 Tuple.pair xs ys

        polyStr : String
        polyStr =
            points
                |> List.map (\(x, y) -> String.fromFloat x ++ "," ++ String.fromFloat y)
                |> String.join " "
    in
    S.svg
        [ SA.viewBox ("0 0 " ++ String.fromFloat w ++ " " ++ String.fromFloat h)
        , SA.preserveAspectRatio "xMidYMid meet"
        , SA.width "100%"              -- responsive
        , SA.height "100%"
        , SA.class "w-full h-24"       -- parent wrapper dictates the final on-screen height
        ]
        [ -- line
          S.polyline
            [ SA.points polyStr
            , SA.fill "none"
            , SA.stroke "currentColor"
            , HA.attribute "vector-effect" "non-scaling-stroke"  -- keep 2px stroke at any scale
            , SA.strokeWidth "2"
            , SA.class "text-sky-300"
            ]
            []
        , -- points (larger invisible hit area + visible dot + group-level <title> tooltip)
          S.g []
            (List.map2
                (\(lbl, v) (x, y) ->
                    S.g []
                        [ -- tooltip for the whole group (triggers on either circle)
                          S.title [] [ text (lbl ++ " — " ++ String.fromInt v ++ " followers") ]
                          -- big invisible hit circle for easy hover
                        , S.circle
                            [ SA.cx (String.fromFloat x)
                            , SA.cy (String.fromFloat y)
                            , SA.r "10"
                            , SA.fill "transparent"
                            ]
                            []
                          -- visible dot
                        , S.circle
                            [ SA.cx (String.fromFloat x)
                            , SA.cy (String.fromFloat y)
                            , SA.r "3.5"
                            , SA.class "text-sky-200 hover:text-white"
                            , SA.fill "currentColor"
                            ]
                            []
                        ]
                )
                series
                points
            )
        ]


-- QUARTER UTILS ---------------------------------------------------

quarterOf : Month -> Int
quarterOf m =
    case m of
        Jan -> 1
        Feb -> 1
        Mar -> 1
        Apr -> 2
        May -> 2
        Jun -> 2
        Jul -> 3
        Aug -> 3
        Sep -> 3
        Oct -> 4
        Nov -> 4
        Dec -> 4


lastNQuarters : Zone -> Posix -> Int -> List ( Int, Int )
lastNQuarters zone now n =
    let
        curY = toYear zone now
        curQ = quarterOf (toMonth zone now)

        -- produce [ (y,q) ... ] oldest → newest
        go k (y,q) acc =
            if k == 0 then
                List.reverse acc
            else
                let
                    (y2, q2) =
                        if q == 1 then (y - 1, 4) else (y, q - 1)
                in
                go (k - 1) (y2, q2) ((y2, q2) :: acc)
    in
    -- We want n quarters INCLUDING the current quarter end.
    -- Start from the *end* of the current quarter by pre-pending (curY,curQ)
    let base = go (n - 1) (curY, curQ) [ (curY, curQ) ] in base


quarterLabel : Int -> Int -> String
quarterLabel year q =
    "Q" ++ String.fromInt q ++ " " ++ (String.fromInt (modBy 100 year))


inQuarter : Zone -> DateTime -> ( Int, Int ) -> Bool
inQuarter zone dt (y,q) =
    let
        p = DateTime.toPosix dt
    in
        toYear zone p == y && quarterOf (toMonth zone p) == q


cumulative : Int -> List Int -> List Int
cumulative seed gains =
    let
        step g (acc, out) =
            let nxt = acc + g
            in (nxt, nxt :: out)
    in
    gains
        |> List.foldl step (seed, [])
        |> Tuple.second
        |> List.reverse


quarterGains : List Int -> List Int
quarterGains cumulVals =
    let diffs xs =
            case xs of
                a :: b :: rest -> (b - a) :: diffs (b :: rest)
                _ -> []
    in
    diffs cumulVals

-- followerGrowthCurveCard : List Int -> Html msg
-- followerGrowthCurveCard points =
--     let
--         w = 180
--         h = 90
--         minV = List.minimum points |> Maybe.withDefault 0
--         maxV = List.maximum points |> Maybe.withDefault 1
--         spanV =
--             if maxV == minV then 1 else (toFloat (maxV - minV))

--         n = List.length points |> max 1
--         stepX = (toFloat w) / toFloat (n - 1)

--         toXY i v =
--             let
--                 x = stepX * toFloat i
--                 y =
--                     h - (toFloat (v - minV) / spanV) * toFloat h
--             in
--             String.fromFloat x ++ "," ++ String.fromFloat y

--         poly =
--             points
--                 |> List.indexedMap toXY
--                 |> String.join " "
--     in
--     div
--         [ HA.class
--             (String.join " "
--                 [ "rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-xl p-4"
--                 , "aspect-[4/3] flex flex-col"
--                 ]
--             )
--         ]
--         [ -- header
--           div [ HA.class "flex items-start justify-between mb-2" ]
--             [ span [ HA.class "text-sm font-semibold tracking-wide text-white/80" ] [ text "Follower Growth Curve" ]
--             , div [ HA.class "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-white/10 text-white/80 ring-1 ring-white/15", HA.title "Simple sparkline of follower count over time (mocked series until your feed is wired)" ] [ text "i" ]
--             ]
--         , div [ HA.class "flex-1 flex items-center" ]
--             [ svg [ SA.viewBox ("0 0 " ++ String.fromInt w ++ " " ++ String.fromInt h), SA.class "w-full h-full" ]
--                 [ polyline [ SA.points poly, SA.fill "none", SA.stroke "currentColor", SA.class "text-sky-300", HA.attribute "stroke-width" "2" ] [] ]
--             ]
--         , div [ HA.class "pt-2 text-white/70" ]
--             [ span [ HA.class "text-sm" ] [ text "last " ]
--             , span [ HA.class "text-base font-semibold text-white/80" ] [ text (formatInt (List.length points)) ]
--             , span [ HA.class "text-sm" ] [ text " samples" ]
--             ]
--         ]
