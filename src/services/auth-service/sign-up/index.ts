'use server'

import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { action } from '@/lib/action-handler'

import { signUpSchema } from './schema'

export const signUp = action({
  schema: signUpSchema,
  type: 'public',
  handler: async ({ input }) => {
    const userExists = await prisma.user.findUnique({
      where: {
        email: input.email
      }
    })

    if (userExists) {
      return {
        error: 'Usuário já cadastrado na plataforma'
      }
    }

    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: await hash(input.password, 10),
        name: input.name
      }
    })

    return { data: user }
  }
})
