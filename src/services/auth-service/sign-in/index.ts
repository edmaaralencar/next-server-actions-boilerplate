'use server'

import { action } from '@/lib/action-handler'

import { signInSchema } from './schema'
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes.config'
import { getUserByEmail } from '../get-user-by-email'
import { AuthError } from 'next-auth'
import { signIn as signInNextAuth } from '@/lib/auth'

export const signIn = action({
  schema: signInSchema,
  type: 'public',
  handler: async ({ input }) => {
    const existingUser = await getUserByEmail(input.email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: 'Credenciais inválidas!' }
    }

    try {
      await signInNextAuth('credentials', {
        email: input.email,
        password: input.password,
        redirectTo: DEFAULT_LOGIN_REDIRECT
      })
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Credenciais inválidas!' }
          default:
            return { error: 'Ocorreu um erro!' }
        }
      }

      throw error
    }

    return {}
  }
})
