// March 27th 2023 不支援在 app/api 底下的檔案
// 轉支援檔案在 page/api/[...nextauth].ts

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.NODE_ENV === 'production' ? process.env.GB_ID as string : process.env.GB_ID_LOCAL as string,
      clientSecret: process.env.NODE_ENV === 'production' ? process.env.GB_SECRET as string : process.env.GB_SECRET_LOCAL as string
    }),
    GoogleProvider({
      clientId: process.env.NODE_ENV === 'production' ? process.env.GOOGLE_CLIENT_ID as string : process.env.GOOGLE_CLIENT_ID_LOCAL as string,
      clientSecret: process.env.NODE_ENV === 'production' ? process.env.GOOGLE_CLIENT_SECRET as string : process.env.GOOGLE_CLIENT_SECRET_LOCAL as string,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Incorrect username or password.')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('The account was not found.')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Incorrect password.')
        }

        return user

      }
    })
  ],
  pages: {
    signIn: '/'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_URL
}

export default NextAuth(authOptions)