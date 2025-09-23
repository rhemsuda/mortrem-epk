module Types exposing (..)

import Http
import Browser.Dom as Dom
import DateTime exposing (DateTime)
import Dict exposing (Dict)

type alias Song =
    { title : String
    , src : String
    , released : Bool
    , duration : Float
    , artwork : Maybe String
    }

type alias Image =
    { src : String
    , alt : String
    }

type alias GalleryImage =
    { image : Image
    , colSpan : Int
    , rowSpan : Int
    }

type alias Venue =
    { name : String
    , city : String
    , capacity : Int
    , distanceFromHomeKm : Int
    }

type alias ContactForm =
    { name : String
    , email : String
    , message : String
    , honeypot : String
    }

type ContactStatus
    = ContactIdle
    | ContactEditing
    | ContactSending
    | ContactSuccess
    | ContactError String

type LineupPosition
    = Open
    | Support
    | Headline

type alias Performance =
    { datetime : DateTime
    , venue : Venue
    , totalDraw : Int
    , ourDraw : Int
    , organicDraw : Int
    , newFollowers : Int
    , merchSales : Float
    , ticketPrice : Float
    , position : LineupPosition
    , durationMinutes : Int
    , hide : Bool
    }

type alias YoutubeVideo =
    { title : String
    , youtubeId : String
    , thumbnail : String
    }

type alias Web3Resp =
    { success : Bool
    , message : String
    }

type alias Model =
    { scrollY : Float
    , currentSongIndex : Int
    , isPlaying : Bool
    , currentTime : Float
    , duration : Float
    , songs : List Song
    , musicVideos : List YoutubeVideo
    , selectedMusicVideoIndex : Int
    , error : Maybe String
    , barHeights : List Float
    , currentVideo : String
    , isMenuOpen : Bool
    , contact : ContactForm
    , contactStatus : ContactStatus
    , isContactModalOpen : Bool
    , viewportH : Float
    , videoMarkerIds : List String
    , markerPositions : Dict String Float
    -- , viewportH : Float
     , videoSources : List String
     , videoMarkers : List ( String, Float )
    -- (markerId, absoluteTop)
    , activeBgIndex : Int
    , debugMarkers : Bool
    }

type Msg
    = OnScroll Float
    | PlayPause
    | NextSong
    | PreviousSong
    | TimeUpdate Float Float
    | SongEnded
    | Seek Float
    | SeekProgress Float
    | AudioError String
    | FrequencyData (List Float)
    -- | VideoSwitch Bool
    | SelectSong Int
    | ToggleMenu
    | CloseMenu
    | ScrollTo String
    | SelectMusicVideo Int
    | ScrollVideoReelLeft
    | ScrollVideoReelRight
    | UpdateContactName String
    | UpdateContactEmail String
    | UpdateContactMessage String
    | UpdateContactHoneypot String
    | SubmitContact
    | ContactSent (Result Http.Error Web3Resp)
    | DismissContactModal
    | CopyBandEmail
    | ViewportResized Int Int
    | GotViewport (Result Dom.Error Dom.Viewport)
    | RecalcMarkers
    | GotMarkerPos String (Result Dom.Error Dom.Element)
    | MarkersMeasured (List ( String, Float ))

    --| ViewportResize Float
    --| MarkersMeasured (List ( String, Float ))
