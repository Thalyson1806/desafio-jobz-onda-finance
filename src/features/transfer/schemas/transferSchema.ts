import { z } from 'zod'

export const createTransferSchema = (maxBalance: number) =>
  z.object({
    recipient: z
      .string()
      .min(3, 'Nome do destinatário deve ter pelo menos 3 caracteres'),
    amount: z
      .number({ message: 'Informe um valor válido' })
      .positive('O valor deve ser positivo')
      .max(maxBalance, `Saldo insuficiente. Saldo disponível: R$ ${maxBalance.toFixed(2).replace('.', ',')}`),
    description: z.string().optional(),
  })

export type TransferFormData = {
  recipient: string
  amount: number
  description?: string
}
