port module Main exposing (main)

import Browser
import Html exposing (Html, div, h1, p, text, img)
import Html.Attributes exposing (class, style, src, alt)
import Json.Decode as Decode


-- MODEL

type alias Model =
    { scrollY : Float }

init : () -> ( Model, Cmd Msg )
init _ =
    ( { scrollY = 0 }, Cmd.none )


-- UPDATE

type Msg
    = OnScroll Float

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnScroll y ->
            ( { model | scrollY = y }, Cmd.none )

-- VIEW

view : Model -> Html Msg
view model =
    div []
        [ heroBanner model.scrollY
        , contentPanel
        ]


-- SUBSCRIPTIONS

port onScroll : (Float -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions _ =
    onScroll OnScroll


-- COMPONENTS

heroBanner : Float -> Html msg
heroBanner scrollY =
    let
        scale =
            max 0.5 (1 - scrollY / 300)
    in
    div
        [ class "h-screen bg-fixed bg-center bg-cover flex items-center justify-center text-white"
        , style "background-image" "url('/images/bannerimg.jpeg')"
        ]
        [ -- Translucent black overlay
          div [ class "absolute inset-0 bg-black/40" ] []

          -- Bottom gradient fade
        , div [ class "absolute bottom-0 z-40 h-[5%] w-full bg-gradient-to-t from-black to-black/0" ] []

          -- Centered Logo
        , div [ class "relative z-10 flex items-center justify-center h-full" ]
              [ img [ src "images/Mortrem-logo-white-transparent.png"
                    , alt "Mortrem Logo"
                    , class "w-[70%] transition-transform duration-300"
                    , style "transform" ("scale(" ++ String.fromFloat scale ++ ")")
                    ] []
            ]
        ]


contentPanel : Html msg
contentPanel =
    div [ class "bg-black text-white p-10" ]
        [ h1 [ class "text-3xl font-semibold mb-4" ] [ text "Who We Are" ]
        , p [ class "leading-relaxed" ]
            [ text "The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost...The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost.The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost." ]
        ]



-- BOOTSTRAP


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }























-- module Main exposing (main)

-- import Browser
-- import Html exposing (Html, div, h1, p, text, img)
-- import Html.Attributes exposing (alt, src, class, style)

-- main =
--     Browser.sandbox { init = (), update = \_ model -> model, view = view }


-- bannerSection =
--     img [ class "top-0 left-0 w-full bg-cover bg-center bg-no-repeat", src "/images/bannerimg.png", alt "Banner image" ] []
--     -- div [ class "h-screen bg-cover bg-center bg-no-repeat"
--     --     , style "background-image" "url('images/bannerimg.png')"
--     --     ] []


-- -- contentSection =
-- --     div [ class "bg-black text-white p-8" ]
-- --         [ h1 [ class "text-3xl font-bold mb-4" ] [ text "Who we are" ]
-- --         , p [] [ text "The quick brown fox jumped over the lazy dog into a shimmering pool of rainwater that had gathered since the last frost. Soft clusters of leaves fall without a plan to the ground, mirroring the unhurried chestnut thatch of the fox’s dense coat. The fox looks to the west, only then realizing the horizon has begun to curve towards them. Perhaps they should not have jumped so soon." ]
-- --         ]


-- -- bannerSection =
-- --     div
-- --         [ class "absolute top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat"
-- --         , style "background-image" "url('images/bannerimg.png')"
-- --         ]
-- --         []

-- contentSection =
--     div [ class "relative z-10 mt-screen bg-black text-white p-8 mt-100" ]
--         [ h1 [ class "text-3xl font-bold mb-4" ] [ text "Who we are" ]
--         , p [] [ text "The quick brown fox jumped over the lazy dog...The quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dogThe quick brown fox jumped over the lazy dog" ]
--         ]


-- view _ =
--     div []
--         [ bannerSection
--         , contentSection
--         ]

--     -- img [ src "/images/bannerimg.png", alt "Banner image" ] []
--    -- div [ class "text-center mt-20" ]
--    --     [ h1 [ class "text-4xl font-bold text-blue-600" ] [ text "Hello, Elm + Tailwind!" ] ]
