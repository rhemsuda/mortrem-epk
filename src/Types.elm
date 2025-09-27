module Types exposing (..)

import Http
import Browser.Dom as Dom
import Set exposing (Set)
import Time exposing (Zone)
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

type alias Testimonial =
    { id : Int
    , media : LightboxContent
    , quote : String
    , author : String
    , quotedAt : DateTime
    }

type LightboxContent
    = LbImage { src: String, alt : String }
    | LbYoutube YoutubeVideo

type alias LightboxDetails =
    { media : LightboxContent
    , caption : Maybe String
    , extraText : Maybe String
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
    , isMenuOpen : Bool
    , contact : ContactForm
    , contactStatus : ContactStatus
    , isContactModalOpen : Bool
    , viewportW : Float
    , viewportH : Float
    , videoMarkerIds : List String
    , videoSources : List String
    , videoMarkers : List ( String, Float )
    , activeBgIndex : Int
    , debugMarkers : Bool
    , now : Time.Posix
    , zone : Zone
    , visiblePerfCount : Int
    , expandedPerf : Set Int
    , testimonials : List Testimonial
    , lightbox : Maybe LightboxDetails
    , draggingTestimonials : Maybe { startX : Float, startScrollX : Float }
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
    | MarkersMeasured (List ( String, Float ))
    | TogglePerformance Int
    | LoadMorePerformances
    | GotZone Time.Zone
    | GotNow Time.Posix
    | OpenLightbox LightboxDetails
    | CloseLightbox
    | NoOp
    | BeginTestimonialsDrag Float
    | GotTestimonialsDragStart Float (Result Dom.Error Dom.Viewport)
    | MoveTestimonialsDrag Float
    | EndTestimonialsDrag
