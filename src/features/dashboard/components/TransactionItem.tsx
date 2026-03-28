import type { Transaction } from '../../../shared/types/transaction'
import { formatCurrency, formatDate } from '../../../shared/lib/utils'
import { Badge } from '../../../shared/components/ui/badge'

interface TransactionItemProps {
  transaction: Transaction
}

const categoryColors: Record<string, string> = {
  'Salário': 'success',
  'Alimentação': 'warning',
  'Entretenimento': 'info',
  'Transferência': 'success',
  'Utilidades': 'default',
  'Saúde': 'info',
  'Renda Extra': 'success',
  'Transporte': 'warning',
  'Investimentos': 'success',
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isCredit = transaction.type === 'credit'
  const badgeVariant = (categoryColors[transaction.category] || 'default') as
    | 'success'
    | 'warning'
    | 'info'
    | 'default'
    | 'danger'
    | 'outline'

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/3 transition-colors group">
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          isCredit
            ? 'bg-brand-green/15 text-brand-green'
            : 'bg-red-500/15 text-red-400'
        }`}
      >
        {isCredit ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4v8M12 8l-4 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{transaction.description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-500">{formatDate(transaction.date)}</span>
          <Badge variant={badgeVariant} size="sm">
            {transaction.category}
          </Badge>
        </div>
      </div>

      {/* Amount */}
      <div className="text-right shrink-0">
        <p
          className={`text-sm font-semibold ${
            isCredit ? 'text-brand-green' : 'text-red-400'
          }`}
        >
          {isCredit ? '+' : ''}{formatCurrency(transaction.amount)}
        </p>
      </div>
    </div>
  )
}
