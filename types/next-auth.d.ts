import NextAuth, { DefaultSession, Account as NextAuthAccount } from "next-auth";
import { JWT as NextAuthJWT } from 'next-auth/jwt'

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      /** The user's postal address. */
      accessToken: string;
      refreshToken: string;
      username: string;
    } & DefaultSession["user"];
    error?: string;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    username: string;
  }
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account extends NextAuthAccount {
    expires_at: number;
  }
  /** The OAuth profile returned from your provider */
  interface Profile {}
}

declare module 'next-auth/jwt' {
  interface JWT extends NextAuthJWT {
    accessToken: string;
    refreshToken: string;
    username: string;
    expires_at: number;
    accessTokenExpires: number;
    error?: "RefreshAccessTokenError";
  }
}