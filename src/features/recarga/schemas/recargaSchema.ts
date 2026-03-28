import { z } from 'zod'

export const recargaSchema = z.object({
  amount: z
    .number({ message: 'Informe um valor válido' })
    .positive('O valor deve ser maior que zero')
    .max(100000, 'Valor máximo de R$ 100.000,00'),
  description: z.string().optional(),
})

export type RecargaFormData = z.infer<typeof recargaSchema>
