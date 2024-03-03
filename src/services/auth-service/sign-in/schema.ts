import { z } from 'zod'

export const signInSchema = z.object({
  password: z.string().min(6, { message: 'Senha é obrigatório' }),
  email: z.string().min(1, { message: 'E-mail é obrigatório' })
})
