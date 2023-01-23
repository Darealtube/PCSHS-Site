import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string | unknown;
    user: {
      role: string | unknown;
    } & DefaultSession["user"];
  }

  interface User {
    access_token?: string | unknown;
    role?: string | unknown;
  }
}
