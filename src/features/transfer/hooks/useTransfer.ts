import { useState } from 'react'
import { useBalanceStore } from '../../../shared/stores/balanceStore'
import { useTransactionStore } from '../../../shared/stores/transactionStore'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '../../../shared/hooks/useToast'
import { formatCurrency } from '../../../shared/lib/utils'
import type { TransferFormData } from '../schemas/transferSchema'

interface UseTransferReturn {
  transfer: (data: TransferFormData) => Promise<boolean>
  isLoading: boolean
}

export function useTransfer(): UseTransferReturn {
  const [isLoading, setIsLoading] = useState(false)
  const { deduct } = useBalanceStore()
  const { addTransaction } = useTransactionStore()
  const queryClient = useQueryClient()

  const transfer = async (data: TransferFormData): Promise<boolean> => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      deduct(data.amount)

      addTransaction({
        id: crypto.randomUUID(),
        description: `Transferência para ${data.recipient}${data.description ? ` — ${data.description}` : ''}`,
        amount: -data.amount,
        date: new Date().toISOString().split('T')[0],
        type: 'debit',
        category: 'Transferência',
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] })

      toast({
        variant: 'success',
        title: 'Transferência realizada!',
        description: `${formatCurrency(data.amount)} enviado para ${data.recipient}`,
      })

      return true
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro na transferência',
        description: 'Tente novamente em instantes.',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { transfer, isLoading }
}
