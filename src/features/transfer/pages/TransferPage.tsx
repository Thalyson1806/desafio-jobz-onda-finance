import { Link } from 'react-router-dom'
import { TransferForm } from '../components/TransferForm'
import { Card, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card'

export function TransferPage() {
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
          <h1 className="text-2xl font-bold text-white">Transferência</h1>
          <p className="text-sm text-gray-400">Envie dinheiro de forma rápida e segura</p>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Form */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Nova transferência</CardTitle>
              <CardDescription>
                Preencha os dados para realizar a transferência
              </CardDescription>
            </CardHeader>
            <TransferForm />
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
                <p className="text-sm font-semibold text-white mb-1">Transferências gratuitas</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Todas as transferências são gratuitas e processadas em instantes.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold text-white mb-3">Chaves disponíveis</p>
            <div className="space-y-2">
              {['CPF', 'E-mail', 'Telefone', 'Chave aleatória'].map((key) => (
                <div key={key} className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green/60" />
                  {key}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold text-white mb-3">Limites</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Diário</span>
                  <span className="text-white">R$ 5.000,00</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full">
                  <div className="h-full w-1/3 bg-brand-green rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Mensal</span>
                  <span className="text-white">R$ 50.000,00</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full">
                  <div className="h-full w-1/4 bg-brand-green rounded-full" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
