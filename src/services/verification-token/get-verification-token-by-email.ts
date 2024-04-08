import { prisma } from '@/lib/prisma'

export async function getVerificationTokenByEmail(email: string) {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email }
    })

    return verificationToken
  } catch {
    return null
  }
}
