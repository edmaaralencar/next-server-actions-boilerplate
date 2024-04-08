import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(6, { message: 'Nome é obrigatório' }),
  email: z.string().min(1, { message: 'E-mail é obrigatório' })
})
