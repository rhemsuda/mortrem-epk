module Debug.Overlays exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Types exposing (..)

markerDebugOverlay : Model -> Html Msg
markerDebugOverlay model =
    if not model.debugMarkers then
        text ""
    else
        let
            -- convert absolute doc Y → viewport Y (so we can place a fixed element)
            toViewportY yAbs =
                yAbs - model.scrollY

            -- one horizontal line with label at an absolute marker Y
            lineFor : ( String, Float ) -> Html Msg
            lineFor (idStr, yAbs) =
                let
                    topPx =
                        String.fromFloat (toViewportY yAbs) ++ "px"

                    label =
                        idStr ++ " @ " ++ String.fromFloat yAbs
                in
                div
                    [ style "position" "absolute"
                    , style "left" "0"
                    , style "right" "0"
                    , style "top" topPx
                    , style "height" "0"
                    ]
                    [ -- the line
                      div
                        [ style "border-top" "2px solid rgba(255,0,0,0.7)"
                        , style "width" "100%"
                        ]
                        []
                    , -- the tag
                      div
                        [ style "position" "absolute"
                        , style "right" "8px"
                        , style "top" "-10px"
                        , style "padding" "2px 6px"
                        , style "font-size" "12px"
                        , style "line-height" "1"
                        , style "color" "#ffb3b3"
                        , style "background" "rgba(0,0,0,0.6)"
                        , style "border" "1px solid rgba(255,0,0,0.5)"
                        , style "border-radius" "4px"
                        ]
                        [ text label ]
                    ]

            -- bottom-of-viewport line (to visualize the trigger)
            bottomLine : Html Msg
            bottomLine =
                let
                    topPx = String.fromFloat model.viewportH ++ "px"
                    label =
                        "bottom = scrollY(" ++ String.fromFloat model.scrollY
                            ++ ") + vh(" ++ String.fromFloat model.viewportH
                            ++ ") = " ++ String.fromFloat (model.scrollY + model.viewportH)
                in
                div
                    [ style "position" "absolute"
                    , style "left" "0"
                    , style "right" "0"
                    , style "top" topPx
                    , style "height" "0"
                    ]
                    [ div
                        [ style "border-top" "2px dashed rgba(0,200,255,0.8)"
                        , style "width" "100%"
                        ]
                        []
                    , div
                        [ style "position" "absolute"
                        , style "right" "8px"
                        , style "top" "-40px"
                        , style "padding" "2px 6px"
                        , style "font-size" "12px"
                        , style "line-height" "1"
                        , style "color" "#cdefff"
                        , style "background" "rgba(0,0,0,0.6)"
                        , style "border" "1px solid rgba(0,200,255,0.5)"
                        , style "border-radius" "4px"
                        ]
                        [ text label ]
                    ]

            header : Html Msg
            header =
                div
                    [ style "position" "absolute"
                    , style "left" "8px"
                    , style "top" "8px"
                    , style "padding" "4px 8px"
                    , style "font-size" "12px"
                    , style "color" "#eee"
                    , style "background" "rgba(0,0,0,0.6)"
                    , style "border" "1px solid rgba(255,255,255,0.2)"
                    , style "border-radius" "4px"
                    ]
                    [ text
                        ("activeBgIndex="
                            ++ String.fromInt model.activeBgIndex
                            ++ " · markers="
                            ++ String.fromInt (List.length model.videoMarkers)
                        )
                    ]
        in
        -- fixed overlay that does not capture pointer events
        div
            [ style "position" "fixed"
            , style "inset" "0"
            , style "z-index" "999999"
            , style "pointer-events" "none"
            ]
            (header :: bottomLine :: List.map lineFor model.videoMarkers)
