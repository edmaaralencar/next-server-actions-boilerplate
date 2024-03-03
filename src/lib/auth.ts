/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { getUserById } from '@/services/auth-service/get-user-by-id'
import { getAccountByUserId } from '@/services/auth-service/get-account-by-user-id'

import { prisma } from '@/lib/prisma'

import { authConfig } from '@/config/auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/login',
    error: '/error'
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      // const existingUser = await getUserById(String(user.id))

      // Prevent sign in without email verification
      // if (!existingUser?.emailVerified) return false

      return true
    },
    async session({ token, session }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as 'USER' | 'ADMIN'
      }

      // if (session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      // }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    }
  },
  ...authConfig
})
