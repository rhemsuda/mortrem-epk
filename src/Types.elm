module Types exposing (Song, Image, GalleryImage, Model, Msg(..))

type alias Song =
    { title : String
    , src : String
    , released : Bool
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

type alias Model =
    { scrollY : Float
    , currentSongIndex : Int
    , isPlaying : Bool
    , currentTime : Float
    , duration : Float
    , songs : List Song
    , error : Maybe String
    , barHeights : List Float
    , currentVideo : String
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
    | VideoSwitch Bool
