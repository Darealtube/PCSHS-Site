import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import Providers from "next-auth/providers";
import bcrypt from "bcrypt";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "School Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        lrn: {
          label: "Learner's Reference Number",
          type: "text",
          placeholder: "Learner's Reference Number",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text" },
      },
      async authorize(credentials: any) {
        const saltRounds = 10;
        const user = await prisma.profile.findUnique({
          where: {
            name: credentials.username,
          },
        });
        const hashedPassword = await bcrypt.genSalt(saltRounds).then((salt) => {
          return bcrypt.hash(credentials.password, salt);
        });

        if (credentials.type == "Sign In") {
          const passwordCorrect = await bcrypt.compare(
            credentials.password,
            user?.password || ""
          );

          if ((user && !passwordCorrect) || !user) {
            throw new Error("User may not exist or the credentials are wrong.");
          } else {
            return user;
          }
        } else {
          if (user) {
            throw new Error("User already exists.");
          } else {
            const profile = await prisma.profile.upsert({
              where: { name: credentials.username },
              update: {
                name: credentials.username,
                ...{ lrn: credentials.lrn },
              },
              create: {
                name: credentials.username,
                password: hashedPassword,
                lrn: credentials.lrn,
                role: credentials.lrn ? "Student" : "Government",
              },
            });
            return profile;
          }
        }
      },
    }),
  ],
  secret: process.env.AUTH_CLIENT_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    jwt: true,
  },
  jwt: {
    encryption: true,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    secret: process.env.AUTH_CLIENT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
  },
  callbacks: {
    // Getting the JWT token from API response
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.access_token;
      }
      return token;
    },

    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
