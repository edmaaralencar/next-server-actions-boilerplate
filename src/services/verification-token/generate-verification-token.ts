import { prisma } from '@/lib/prisma'
import { getVerificationTokenByEmail } from './get-verification-token-by-email'

export async function generateVerificationToken(email: string) {
  const token = Math.floor(100000 + Math.random() * 900000)
  const expires = new Date(new Date().getTime() + 600000) // 10 minutos

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const verficationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verficationToken
}
