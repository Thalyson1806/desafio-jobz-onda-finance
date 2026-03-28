import { useState } from 'react'
import { useBalanceStore } from '../../../shared/stores/balanceStore'
import { formatCurrency } from '../../../shared/lib/utils'
import { Card } from '../../../shared/components/ui/card'

interface BalanceCardProps {
  totalCredits: number
  totalDebits: number
}

export function BalanceCard({ totalCredits, totalDebits }: BalanceCardProps) {
  const balance = useBalanceStore((s) => s.balance)
  const [hideBalance, setHideBalance] = useState(false)

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-brand-surface via-brand-surface to-brand-green/5 border-brand-green/20">
      {/* Decorative circle */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-brand-green/5 blur-xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-400">Saldo disponível</p>
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
            aria-label={hideBalance ? 'Mostrar saldo' : 'Ocultar saldo'}
          >
            {hideBalance ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </div>

        <div className="mb-6">
          {hideBalance ? (
            <div className="flex items-center gap-1 h-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-gray-600" />
              ))}
            </div>
          ) : (
            <p className="text-4xl font-bold text-white tracking-tight">
              {formatCurrency(balance)}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 10V2M2 6l4-4 4 4" stroke="#3DDB65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xs text-gray-400">Entradas</span>
            </div>
            <p className="text-sm font-semibold text-brand-green">
              {hideBalance ? '••••••' : formatCurrency(totalCredits)}
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M10 6L6 10 2 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xs text-gray-400">Saídas</span>
            </div>
            <p className="text-sm font-semibold text-red-400">
              {hideBalance ? '••••••' : formatCurrency(totalDebits)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
