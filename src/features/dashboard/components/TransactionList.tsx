import type { Transaction } from '../../../shared/types/transaction'
import { TransactionItem } from './TransactionItem'

interface TransactionListProps {
  transactions: Transaction[]
  isLoading: boolean
}

function TransactionSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/3" />
      </div>
      <div className="h-4 bg-white/10 rounded w-20" />
    </div>
  )
}

export function TransactionList({ transactions, isLoading }: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <TransactionSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg
          className="w-12 h-12 mx-auto mb-3 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-sm">Nenhuma transação encontrada</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-brand-border">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  )
}
