import { VerifyEmail } from '@/components/emails/verify-email'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const domain = 'http://localhost:3000'

export const sendVerificationEmail = async (email: string, token: number) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    react: <VerifyEmail verificationCode={token} email={email} />
  })
}
