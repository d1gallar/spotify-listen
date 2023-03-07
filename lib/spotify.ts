import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "ugc-image-upload",
  "user-read-email",
  "streaming",
  "user-read-private",
  "user-library-read", // might remove!
  "user-top-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(",");

const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID || "";
const SPOTIFY_CLIENT_SECRET: string = process.env.SPOTIFY_CLIENT_SECRET || "";

const params = {
  scope: scopes,
};

const queryParams = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;

export {LOGIN_URL};