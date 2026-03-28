import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTransferSchema, type TransferFormData } from '../schemas/transferSchema'
import { useTransfer } from '../hooks/useTransfer'
import { useBalanceStore } from '../../../shared/stores/balanceStore'
import { Button } from '../../../shared/components/ui/button'
import { Input } from '../../../shared/components/ui/input'
import { formatCurrency } from '../../../shared/lib/utils'
import { useState } from 'react'

export function TransferForm() {
  const balance = useBalanceStore((s) => s.balance)
  const { transfer, isLoading } = useTransfer()
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(createTransferSchema(balance)),
  })

  const amount = watch('amount')

  const onSubmit = async (data: TransferFormData) => {
    const ok = await transfer(data)
    if (ok) {
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {success && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-green/10 border border-brand-green/30 text-brand-green text-sm">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Transferência realizada com sucesso!
        </div>
      )}

      <Input
        id="recipient"
        label="Destinatário"
        type="text"
        placeholder="Nome ou chave Pix"
        error={errors.recipient?.message}
        {...register('recipient')}
      />

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1.5">
          Valor
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
            R$
          </span>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0,00"
            className={`flex h-11 w-full rounded-xl border bg-brand-surface pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent ${
              errors.amount
                ? 'border-red-500/50'
                : 'border-brand-border hover:border-brand-green/30'
            }`}
            {...register('amount', { valueAsNumber: true })}
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-xs text-red-400">{errors.amount.message}</p>
        )}
        <p className="mt-1.5 text-xs text-gray-500">
          Saldo disponível:{' '}
          <span className="text-brand-green font-medium">{formatCurrency(balance)}</span>
        </p>
      </div>

      <Input
        id="description"
        label="Descrição (opcional)"
        type="text"
        placeholder="Ex: Pagamento de aluguel"
        error={errors.description?.message}
        {...register('description')}
      />

      {/* Summary */}
      {amount > 0 && !isNaN(amount) && (
        <div className="p-4 rounded-xl bg-white/3 border border-brand-border space-y-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Resumo</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Valor</span>
            <span className="text-white font-medium">{formatCurrency(amount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Taxa</span>
            <span className="text-brand-green font-medium">Grátis</span>
          </div>
          <div className="border-t border-brand-border pt-2 flex justify-between text-sm">
            <span className="text-gray-400">Saldo após</span>
            <span className="text-white font-medium">{formatCurrency(balance - (amount || 0))}</span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processando...
          </span>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 7H13M10 4L13 7L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Confirmar transferência
          </>
        )}
      </Button>
    </form>
  )
}
