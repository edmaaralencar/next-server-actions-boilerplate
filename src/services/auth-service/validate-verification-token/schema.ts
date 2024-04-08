import { z } from 'zod'

export const validateVerificationTokenSchema = z.object({
  code: z.string().min(6, { message: 'Código de verificação é obrigatório' })
})
