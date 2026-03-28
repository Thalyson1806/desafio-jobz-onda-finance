import { useTransactionStore } from '../../../shared/stores/transactionStore'

export function useDashboard() {
  const transactions = useTransactionStore((s) => s.transactions)

  const totalCredits = transactions
    .filter((t) => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalDebits = transactions
    .filter((t) => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const recentTransactions = transactions.slice(0, 3)

  return {
    recentTransactions,
    totalCredits,
    totalDebits,
  }
}
