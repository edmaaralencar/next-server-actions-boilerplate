'use server'

import { action } from '@/lib/action-handler'

import { updatePasswordSchema } from './schema'
import { getUserById } from '../get-user-by-id'
import { compare, hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const updatePassword = action({
  schema: updatePasswordSchema,
  type: 'private',
  handler: async ({ input, user }) => {
    const existsUser = await getUserById(String(user.id))

    const isOldPasswordCorrect = await compare(
      input.oldPassword,
      String(existsUser?.password)
    )

    if (!isOldPasswordCorrect) {
      return { error: 'Senha antiga incorreta!' }
    }

    if (input.newPassword !== input.confirmPassword) {
      return { error: 'Novas senhas não estão iguais.' }
    }

    await prisma.user.update({
      where: {
        id: String(existsUser?.id)
      },
      data: {
        password: await hash(input.newPassword, 10)
      }
    })

    return { data: 'Senha atualizada com sucesso.' }
  }
})
