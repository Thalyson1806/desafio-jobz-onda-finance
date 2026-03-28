import { Link } from 'react-router-dom'
import { RecargaForm } from '../components/RecargaForm'
import { Card, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card'

export function RecargaPage() {
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
          <h1 className="text-2xl font-bold text-white">Recarga</h1>
          <p className="text-sm text-gray-400">Adicione saldo à sua carteira</p>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Form */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Nova recarga</CardTitle>
              <CardDescription>Informe o valor que deseja adicionar ao saldo</CardDescription>
            </CardHeader>
            <RecargaForm />
          </Card>
        </div>

        {/* Info */}
        <div className="md:col-span-2 space-y-4">
          <Card className="bg-brand-green/5 border-brand-green/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#3DDB65" strokeWidth="1.5" />
                  <path d="M7 5v3M7 10v.5" stroke="#3DDB65" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">Crédito instantâneo</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  O saldo é creditado imediatamente após a confirmação.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold text-white mb-3">Métodos aceitos</p>
            <div className="space-y-2">
              {['PIX', 'TED / DOC', 'Cartão de débito', 'USDT / USDC'].map((method) => (
                <div key={method} className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green/60" />
                  {method}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
