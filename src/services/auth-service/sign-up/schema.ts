import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  password: z.string().min(6, { message: 'Senha é obrigatório' }),
  email: z.string().min(1, { message: 'E-mail é obrigatório' })
})
