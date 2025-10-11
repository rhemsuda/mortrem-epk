module Components exposing (..)

import Constants
import Types exposing (..)

import Html exposing (Html, div, span, text, i, button)
import Html.Attributes exposing (class, style, src, alt, id, href, target, width, height, preload, title, attribute)
import Html.Events exposing (on, onClick, onInput, onSubmit, stopPropagationOn, preventDefaultOn)

helpHint : Model -> { title : String, body : String } -> Html Msg
helpHint model cfg =
    let
        isMobile =
            model.viewportW < Constants.mobileThreshold

        desktopPopover =
            div [ class "relative inline-block group align-middle" ]
                [ button
                      [ class ( "inline-flex items-center justify-center rounded-full " ++
                                "bg-white/10 ring-1 ring-white/15 text-white/80 " ++
                                "focus:outline-none focus:ring-2 focus:ring-white/30" )
                      , Html.Attributes.attribute "type" "button"
                      , Html.Attributes.attribute "aria-label" "More info"
                      ]
                      [ i [ class "fa-solid fa-circle-info text-[1em] leading-none" ] [] ]
                , div
                    [ class
                          ( "absolute top-full right-0 mt-2 min-w-[14rem] max-w-[20rem] " ++
                            "rounded-md bg-black/90 text-white p-3 text-xs ring-1 ring-white/10 shadow-xl z-50 " ++
                            "opacity-0 pointer-events-none transition " ++
                            "group-hover:opacity-100 group-hover:pointer-events-auto " ++
                            "group-focus-within:opacity-100 group-focus-within:pointer-events-auto" )
                    ]
                    [ div [ class "font-semibold mb-1 text-white/90" ] [ text cfg.title ]
                    , div [] [ text cfg.body ]
                    ]

                ]
        mobileButton =
            button
                [ class ("inline-flex items-center justify-center rounded-full " ++
                         "bg-white/10 ring-1 ring-white/15 text-white/80")
                , onClick <|
                    OpenLightbox
                        { media = LbNone
                        , caption = Just cfg.title
                        , extraText = Just cfg.body
                        }
                , Html.Attributes.attribute "type" "button"
                , Html.Attributes.attribute "aria-label" "More info"
                ]
                [ i [ class "fa-solid fa-circle-info text-[1em] leading-none" ] [] ]
    in
    if isMobile then
        mobileButton
    else
        desktopPopover
