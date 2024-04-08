'use server'

import { action } from '@/lib/action-handler'
import { validateVerificationTokenSchema } from './schema'
import { getVerificationTokenByEmail } from '@/services/verification-token/get-verification-token-by-email'
import { getUserByEmail } from '../get-user-by-email'
import { prisma } from '@/lib/prisma'

export const validateVerificationToken = action({
  schema: validateVerificationTokenSchema,
  type: 'public',
  handler: async ({ context, input }) => {
    console.log({ oi: 'oijaedoiajd' })
    if (!context) {
      return { error: 'Erro...' }
    }

    const existingUser = await getUserByEmail(context.email)

    if (!existingUser) {
      return { error: 'Usuário não existe!' }
    }

    const userToken = await getVerificationTokenByEmail(
      String(existingUser.email)
    )

    if (!userToken) {
      return { error: 'Não existe um código de verificação para esse email!' }
    }

    if (userToken.token !== Number(input.code)) {
      return { error: 'Código inválido!' }
    }

    const hasExpired = new Date(userToken.expires) < new Date()

    if (hasExpired) {
      return { error: 'Token expirado!' }
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingUser.email
      }
    })

    await prisma.verificationToken.delete({
      where: { id: userToken.id }
    })

    return { data: 'Token validado com sucesso!' }
  }
})
