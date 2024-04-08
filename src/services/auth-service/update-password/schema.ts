import { z } from 'zod'

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(6, { message: 'Senha antiga é obrigatória' }),
  newPassword: z.string().min(6, { message: 'Senha nova é obrigatória' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Confirmação de senha é obrigatória' })
})
