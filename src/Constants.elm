module Constants exposing (..)

import Types exposing (Venue)

venue_theCasbah : Venue
venue_theCasbah = { name = "The Casbah", city = "Hamilton", capacity = 160, distanceFromHomeKm = 65 }

venue_tailOfTheJunction : Venue
venue_tailOfTheJunction = { name = "Tail of the Junction", city = "Toronto", capacity = 120, distanceFromHomeKm = 94 }

venue_jimmyJazz : Venue
venue_jimmyJazz = { name = "Jimmy Jazz", city = "Guelph", capacity = 180, distanceFromHomeKm = 27 }

venue_theUnion : Venue
venue_theUnion = { name = "The Union", city = "Kitchener", capacity = 200, distanceFromHomeKm = 9 }

venue_leesPalace : Venue
venue_leesPalace = { name = "Lee's Palace", city = "Toronto", capacity = 450, distanceFromHomeKm = 113 }

venue_sneakyDees : Venue
venue_sneakyDees = { name = "Sneaky Dees", city = "Toronto", capacity = 220, distanceFromHomeKm = 114 }

venue_absinthe : Venue
venue_absinthe = { name = "Club Absinthe", city = "Hamilton", capacity = 150, distanceFromHomeKm = 68 }

venue_duffysTavern : Venue
venue_duffysTavern = { name = "Duffy's Tavern", city = "Toronto", capacity = 200, distanceFromHomeKm = 110 }

venue_redPapaya : Venue
venue_redPapaya = { name = "Red Papaya", city = "Guelph", capacity = 200, distanceFromHomeKm = 28 }

venue_hardLuck : Venue
venue_hardLuck = { name = "Hard Luck", city = "Toronto", capacity = 200, distanceFromHomeKm = 113 }

venue_theHub : Venue
venue_theHub = { name = "The Hub", city = "Kitchener", capacity = 500, distanceFromHomeKm = 7 }

bandEmail : String
bandEmail = "mortremofficial@gmail.com"

web3formsEndpoint : String
web3formsEndpoint = "https://api.web3forms.com/submit"

web3formsAccessKey : String
web3formsAccessKey = "9e3f19e3-d569-4576-8f47-1d96a511ae15"

videoBgSources : List String
videoBgSources =
    [ "/videos/epk-banner-fixed.mp4"
    , "/videos/epk-banner-fixed-clid.mp4"
    , "/videos/epk-banner-fixed.mp4"
    , "/videos/epk-banner-fixed-clid.mp4"
    ]

videoMarkerIds : List String
videoMarkerIds =
    [ "videoswitch-marker-1"
    , "videoswitch-marker-2"
    , "videoswitch-marker-3"
    ]

mobileThreshold : Float
mobileThreshold = 768.0
