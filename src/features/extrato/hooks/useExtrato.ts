import { useQuery } from '@tanstack/react-query'
import { useTransactionStore } from '../../../shared/stores/transactionStore'
import type { Transaction } from '../../../shared/types/transaction'

export function useExtrato() {
  const storeTransactions = useTransactionStore((s) => s.transactions)

  const { data: transactions = storeTransactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(useTransactionStore.getState().transactions), 300)
      ),
    initialData: storeTransactions,
  })

  const totalCredits = transactions
    .filter((t) => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalDebits = transactions
    .filter((t) => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return { transactions: storeTransactions, isLoading, totalCredits, totalDebits }
}
