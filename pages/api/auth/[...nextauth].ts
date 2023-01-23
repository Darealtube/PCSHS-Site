import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "School Credentials",
      credentials: {
        lrn: {
          label: "Learner's Reference Number",
          type: "text",
          placeholder: "Learner's Reference Number",
        },
        name: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text" },
        role: { label: "Role", type: "text" },
      },
      authorize: async (credentials) => {
        const saltRounds = 10;
        if (!credentials) return null;

        if (credentials.type == "Sign In") {
          const user = await prisma.profile
            .findUnique({
              where: { name: credentials.name },
            })
            .catch((error) => console.log(error));

          if (user) {
            const correctPass = await bcrypt.compare(
              credentials.password,
              user.password
            );
            return correctPass ? user : null;
          }
        }

        const hashedPassword = await bcrypt.genSalt(saltRounds).then((salt) => {
          return bcrypt.hash(credentials.password, salt);
        });

        const profile = await prisma.profile.create({
          data: {
            ...credentials,
            password: hashedPassword,
          },
        });

        return profile;
      },
    }),
  ],
  secret: process.env.AUTH_CLIENT_SECRET,
  pages: { signIn: "/auth/signin" },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
  },
  jwt: { secret: process.env.AUTH_CLIENT_SECRET },
  callbacks: {
    // Getting the JWT token from API response
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      return session;
    },
  },
});
