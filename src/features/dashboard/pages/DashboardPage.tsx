import { Link } from 'react-router-dom'
import { useDashboard } from '../hooks/useDashboard'
import { BalanceCard } from '../components/BalanceCard'
import { TransactionList } from '../components/TransactionList'
import { Card, CardHeader, CardTitle } from '../../../shared/components/ui/card'
import { Button } from '../../../shared/components/ui/button'
import { useAuth } from '../../../shared/hooks/useAuth'

const quickActions = [
  {
    label: 'Transferir',
    to: '/transfer',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 7H17M14 4L17 7L14 10M17 13H3M6 10L3 13L6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Extrato',
    to: '/extrato',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6 6h8M6 10h8M6 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export function DashboardPage() {
  const { recentTransactions, totalCredits, totalDebits } = useDashboard()
  const { user } = useAuth()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{greeting},</p>
          <h1 className="text-2xl font-bold text-white">
            {user?.name?.split(' ')[0] ?? 'Usuário'}
          </h1>
        </div>
        <Button asChild variant="primary" size="md">
          <Link to="/transfer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 7H13M10 4L13 7L10 10M13 9H3M6 6L3 9L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Transferir
          </Link>
        </Button>
      </div>

      {/* Balance */}
      <BalanceCard totalCredits={totalCredits} totalDebits={totalDebits} />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-green/30 hover:bg-brand-green/5 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-brand-green/10 flex items-center justify-center text-gray-400 group-hover:text-brand-green transition-colors">
              {action.icon}
            </div>
            <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
              {action.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="p-0 overflow-hidden">
        <CardHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle>Últimas transações</CardTitle>
            <Link
              to="/extrato"
              className="text-xs text-brand-green hover:underline"
            >
              Ver extrato completo →
            </Link>
          </div>
        </CardHeader>
        <div className="mt-4">
          <TransactionList transactions={recentTransactions} isLoading={false} />
        </div>
      </Card>
    </div>
  )
}
