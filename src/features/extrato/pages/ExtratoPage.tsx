import { Link } from 'react-router-dom'
import { useExtrato } from '../hooks/useExtrato'
import { TransactionList } from '../../dashboard/components/TransactionList'
import { Card } from '../../../shared/components/ui/card'
import { formatCurrency } from '../../../shared/lib/utils'

export function ExtratoPage() {
  const { transactions, isLoading, totalCredits, totalDebits } = useExtrato()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-green/30 transition-all"
          aria-label="Voltar ao Dashboard"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Extrato</h1>
          <p className="text-sm text-gray-400">Histórico completo de transações</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-brand-green/5 border-brand-green/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M3 7l4-4 4 4" stroke="#3DDB65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400">Total entradas</p>
              <p className="text-base font-bold text-brand-green">{formatCurrency(totalCredits)}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-red-500/5 border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 3v8M11 7L7 11 3 7" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400">Total saídas</p>
              <p className="text-base font-bold text-red-400">{formatCurrency(totalDebits)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Full list */}
      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Todas as transações</h2>
          <span className="text-xs text-gray-500 bg-brand-dark px-2 py-1 rounded-full">
            {transactions.length} registros
          </span>
        </div>
        <TransactionList transactions={transactions} isLoading={isLoading} />
      </Card>
    </div>
  )
}
