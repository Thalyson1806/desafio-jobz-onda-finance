import { Navigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { Logo } from '../../../shared/components/Logo'
import { useAuth } from '../../../shared/hooks/useAuth'

export function LoginPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-green/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-green/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-green/3 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(61,219,101,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(61,219,101,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center mb-4" />
          <p className="text-gray-400 text-sm">
            Sua plataforma financeira moderna
          </p>
        </div>

        {/* Card */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-8 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">Bem-vindo de volta</h1>
            <p className="text-gray-400 text-sm">Faça login para acessar sua conta</p>
          </div>

          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          &copy; {new Date().getFullYear()} Onda Finance. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
