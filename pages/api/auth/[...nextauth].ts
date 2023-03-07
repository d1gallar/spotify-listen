import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import type { NextAuthOptions } from "next-auth";
import spotifyApi, { LOGIN_URL } from "@/lib/spotify";
import axios from "axios";

const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID || "";
const SPOTIFY_CLIENT_SECRET: string = process.env.SPOTIFY_CLIENT_SECRET || "";
const NEXTAUTH_SECRET: string = process.env.NEXTAUTH_SECRET || "";

const getRefreshToken = async (token: any) => {
  try {
    spotifyApi.setAccessToken(token.accessToken as string);
    spotifyApi.setAccessToken(token.refreshToken as string);

    const basicAuth = Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
      refreshToken: data.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log("refresh failed!", error);
    return {
      ...token,
      error: "RefreshAccessTokenError" as const,
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      authorization: LOGIN_URL,
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial login
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: (account.expires_at as number) * 1000,
        };
      }

      // if token hasn't expired yet use the original access token
      if (Date.now() < token.accessTokenExpires) {
        console.log("Access token is valid!");
        console.log(new Date(token.accessTokenExpires).toLocaleString());
        return token;
      }

      // if token is expired, get a new refresh token
      console.log("Access token has expired. Attempting to refresh.");
      return await getRefreshToken(token);
    },
    async session({ session, user, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.accessToken as string;
      session.user.username = token.username as string;

      return session;
    },
  },
};

export default NextAuth(authOptions);
