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
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text" },
      },
      async authorize(credentials, _req) {
        // Add logic here to look up the user from the credentials supplied
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
          if (user) {
            const passwordCorrect = await bcrypt.compare(
              credentials.password,
              user?.password as string
            );
            if (!passwordCorrect) {
              throw new Error("User may not exist or the password is wrong.");
            } else {
              return Promise.resolve(user);
            }
          }
        } else {
          if (user) {
            throw new Error("User already exists.");
          } else {
            const student = await prisma.profile.upsert({
              where: {
                name: credentials.username,
              },
              update: { name: credentials.username },
              create: {
                name: credentials.username,
                password: hashedPassword,
              },
            });
            return Promise.resolve(student);
          }
        }
        return Promise.resolve(user);
      },
    }),
  ],
  secret: process.env.AUTH_CLIENT_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    jwt: true,
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_KEY,
  },
  callbacks: {
    // Getting the JWT token from API response
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },

    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
