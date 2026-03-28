import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockLogin } from '../../../mocks/handlers'
import { useAuthStore } from '../../../shared/stores/authStore'

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login: setAuth } = useAuthStore()
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const { user, token } = await mockLogin(email, password)
      setAuth(user, token)
      navigate('/dashboard')
    } catch {
      setError('Credenciais inválidas')
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}
