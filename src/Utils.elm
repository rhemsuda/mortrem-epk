module Utils exposing (..)

activeIndexFrom : Float -> List ( String, Float ) -> Int -> Int
activeIndexFrom bottomY markers videosLen =
    let
        passed =
            markers
                |> List.filter (\(_, top) -> top <= bottomY)
                |> List.length
    in
    Basics.clamp 0 (videosLen - 1) passed
