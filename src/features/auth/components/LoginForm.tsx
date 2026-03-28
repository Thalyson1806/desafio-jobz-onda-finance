import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../schemas/loginSchema'
import { useLogin } from '../hooks/useLogin'
import { Button } from '../../../shared/components/ui/button'
import { Input } from '../../../shared/components/ui/input'

export function LoginForm() {
  const { login, isLoading, error } = useLogin()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        id="email"
        label="E-mail"
        type="email"
        placeholder="demo@onda.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="relative">
        <Input
          id="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <button
          type="button"
          className="absolute right-3 top-[38px] text-gray-400 hover:text-white transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {showPassword ? (
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

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mt-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Entrando...
          </span>
        ) : (
          'Entrar'
        )}
      </Button>

      <p className="text-center text-xs text-gray-500 mt-4">
        Use{' '}
        <span className="text-brand-green font-mono">demo@onda.com</span>
        {' '}e senha{' '}
        <span className="text-brand-green font-mono">onda123</span>
      </p>
    </form>
  )
}
