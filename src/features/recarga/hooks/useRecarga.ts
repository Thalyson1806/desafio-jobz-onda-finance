import { useState } from 'react'
import { useBalanceStore } from '../../../shared/stores/balanceStore'
import { useTransactionStore } from '../../../shared/stores/transactionStore'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '../../../shared/hooks/useToast'
import { formatCurrency } from '../../../shared/lib/utils'
import type { RecargaFormData } from '../schemas/recargaSchema'

export function useRecarga() {
  const [isLoading, setIsLoading] = useState(false)
  const { credit } = useBalanceStore()
  const { addTransaction } = useTransactionStore()
  const queryClient = useQueryClient()

  const recarga = async (data: RecargaFormData): Promise<boolean> => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      credit(data.amount)

      addTransaction({
        id: crypto.randomUUID(),
        description: data.description?.trim()
          ? data.description.trim()
          : 'Recarga de saldo',
        amount: data.amount,
        date: new Date().toISOString().split('T')[0],
        type: 'credit',
        category: 'Recarga',
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] })

      toast({
        variant: 'success',
        title: 'Recarga realizada!',
        description: `${formatCurrency(data.amount)} adicionado ao seu saldo`,
      })

      return true
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro na recarga',
        description: 'Tente novamente em instantes.',
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { recarga, isLoading }
}
