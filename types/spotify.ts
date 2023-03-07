export type Image = {
  url: string;
  height: number;
  width: number;
};

export type Images = Image[];

export type Device = {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
};

export type Devices = Device[];

export type Context = {
  type: string;
  href: string;
  external_urls: ExternalUrl;
  uri: string;
};

export type ExternalUrl = { spotify: string };

export type Album = {
  album_type: string;
  total_tracks: string;
  available_markets: string[];
  external_urls: ExternalUrl;
  id: string;
  images: Images;
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  copyrights: Copyrights;
  genres: string[];
  label: string;
  popularity: number;
};

export type Copyright = {
  text: string;
  type: string;
};

export type Copyrights = Copyright[];

export type Artist = {
  external_urls: ExternalUrl;
  genres: string[];
  id: string;
  images: Images;
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type Track = {
  album: Album;
  artists: Artists;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrl;
  id: string;
  name: string;
  popularity: number;
  previewUrl: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type Tracks = Track[];

export type Artists = Artist[];

export type PlaybackActions = {
  interrupting_playback: boolean;
  pausing: boolean;
  resuming: boolean;
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_shuffle: boolean;
  toggling_repeat_track: boolean;
  transferring_playback: boolean;
};

export type Playback = {
  device: Device;
  context: Context;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: Track;
  shuffle_state: boolean;
  repeat_state: string;
  currently_playing_type: string;
  actions: PlaybackActions;
};

export type Cursor = {
  after: string;
  before: string;
};

export type RecentlyPlayedItem = {
  track: Track;
  played_at: string;
  context: Context;
};

export type RecentlyPlayed = {
  limit: string;
  next: string;
  cursors: Cursor;
  total: number;
  items: RecentlyPlayedItem[];
};

export type TopItems = {
  href: string;
  items: Artists | Tracks;
  limit: number;
  next: string;
  previous: string;
  total: number;
};

export type TimeRange = "short_term" | "medium_term" | "long_term";

export type Owner = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
};

export type SavedTracks = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SavedTrackItems;
};

export type SavedTrackItems = SavedTrackItem[];

export type SavedTrackItem = {
  added_at: string;
  track: Track;
};

export type CurrentlyPlayingTrack = {
  device: Device;
  repeat_state: string;
  shuffle_state: string;
  context: Context;
  timestamp: string;
  progress_ms: string;
  is_playing: string;
  item: Track;
  currently_playing_type: string;
  actions: PlaybackActions;
};

export type Queue = {
  currently_playing: Track;
  queue: Tracks;
};

export type Repeat = "track" | "context" | "off";
