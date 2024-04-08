'use server'

import { action } from '@/lib/action-handler'

import { updateProfileSchema } from './schema'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const updateProfile = action({
  schema: updateProfileSchema,
  type: 'private',
  handler: async ({ input, user }) => {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        email: input.email,
        name: input.name
      }
    })

    revalidatePath('/')

    return { data: 'sucesso' }
  }
})
