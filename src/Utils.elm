module Utils exposing (..)

import DateTime exposing (DateTime, fromPosix, toPosix)
import Time exposing (Posix, millisToPosix, Zone, Month(..), utc, toYear, toMonth, toDay, toHour, toMinute)
import Types exposing (Performance, MerchUnits)
import Iso8601

pad2 : Int -> String
pad2 n = if n < 10 then "0" ++ String.fromInt n else String.fromInt n

posixFromIso : String -> Result String Posix
posixFromIso s =
    s
        |> Iso8601.toTime
        |> Result.mapError (\_ -> "Invalid ISO-8601 timestamp")


{-| Same as `posixFromIso` but returns a DateTime. -}
dateTimeResult : String -> Result String DateTime
dateTimeResult s =
    posixFromIso s |> Result.map fromPosix


{-| Convenience: parse to DateTime, falling back to epoch on failure. -}
dateTime : String -> DateTime
dateTime s =
    case dateTimeResult s of
        Ok dt ->
            dt

        Err _ ->
            fromPosix (millisToPosix 0)


{-| Like `dateTime` but lets you choose the fallback. -}
dateTimeOr : DateTime -> String -> DateTime
dateTimeOr fallback s =
    case dateTimeResult s of
        Ok dt ->
            dt

        Err _ ->
            fallback

monthAbbrev : Month -> String
monthAbbrev m =
    case m of
        Jan -> "Jan"
        Feb -> "Feb"
        Mar -> "Mar"
        Apr -> "Apr"
        May -> "May"
        Jun -> "Jun"
        Jul -> "Jul"
        Aug -> "Aug"
        Sep -> "Sep"
        Oct -> "Oct"
        Nov -> "Nov"
        Dec -> "Dec"

formatDateLocal : Zone -> DateTime -> String
formatDateLocal zone dt =
    let p = toPosix dt in
    monthAbbrev (toMonth zone p)
        ++ " "
        ++ String.fromInt (toDay zone p)
        ++ ", "
        ++ String.fromInt (toYear zone p)

formatMonthYearLocal : Zone -> DateTime -> String
formatMonthYearLocal zone dt =
    let p = toPosix dt in
    monthAbbrev (toMonth zone p)
        ++ " "
        ++ String.fromInt (toYear zone p)

formatTimeLocalHHMM : Zone -> DateTime -> String
formatTimeLocalHHMM zone dt =
    let p = toPosix dt in
    pad2 (toHour zone p) ++ ":" ++ pad2 (toMinute zone p)

formatCurrency : Float -> String
formatCurrency x =
    let
        cents = round (x * 100)
        dollars = cents // 100
        remC = abs (cents - dollars * 100)
        c2 = if remC < 10 then "0" ++ String.fromInt remC else String.fromInt remC
    in
    "$" ++ String.fromInt dollars ++ "." ++ c2

showRevenue : Performance -> Float
showRevenue perf =
    toFloat perf.totalDraw * perf.ticketPrice

ourRevenue : Performance -> Float
ourRevenue perf =
    toFloat perf.ourDraw * perf.ticketPrice

drawPercentage : Performance -> Int
drawPercentage perf =
    floor (((toFloat perf.ourDraw) / (toFloat perf.totalDraw)) * 100)

capacityPercentage : Performance -> Int
capacityPercentage perf =
    floor (((toFloat perf.totalDraw) / (toFloat perf.venue.capacity)) * 100)
        
activeIndexFrom : Float -> List ( String, Float ) -> Int -> Int
activeIndexFrom bottomY markers videosLen =
    let
        crossed =
            markers
                |> List.sortBy Tuple.second
                |> List.filter (\(_, y) -> y <= bottomY)
                |> List.length
    in
    Basics.clamp 0 (videosLen - 1) crossed

totalUnits : MerchUnits -> Int
totalUnits m =
    m.shirts + m.stickers

sumUnits : List MerchUnits -> Int
sumUnits =
    List.map totalUnits >> List.sum


{-| Simple helper for fixed-precision display without bringing in extra deps. -}
roundTo : Int -> Float -> Float
roundTo places n =
    let
        f = 10 ^ places |> toFloat
    in
    (n * f |> round |> toFloat) / f


cdnUrl : String -> String -> String
cdnUrl cdnBase path =
    if String.startsWith "http://" path || String.startsWith "https://" path then
        path
    else if String.isEmpty (String.trim cdnBase) then
        path
    else
        let
            -- ensure single slash
            p =
                if String.startsWith "/" path then
                    path
                else
                    "/" ++ path
        in
        cdnBase ++ p
