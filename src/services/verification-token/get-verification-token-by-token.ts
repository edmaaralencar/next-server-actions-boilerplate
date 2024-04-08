import { prisma } from '@/lib/prisma'

export async function getVerificationTokenByToken(token: number) {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token }
    })

    return verificationToken
  } catch {
    return null
  }
}
