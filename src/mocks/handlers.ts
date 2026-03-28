import type { User } from '../shared/types/auth'
import { mockTransactions } from './transactions'

export const MOCK_USER: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@onda.com',
  avatar: undefined,
}

export const MOCK_CREDENTIALS = {
  email: 'demo@onda.com',
  password: 'onda123',
}

export const MOCK_TOKEN = 'mock-jwt-token-onda-finance-2026'

export async function mockLogin(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    return {
      user: MOCK_USER,
      token: MOCK_TOKEN,
    }
  }

  throw new Error('Credenciais inválidas')
}

export async function mockFetchTransactions() {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockTransactions
}
