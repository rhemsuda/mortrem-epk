module Utils exposing (..)

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
