import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { useAuthStore } from '../shared/stores/authStore'

// Mock react-router-dom navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderWithProviders(ui: React.ReactElement) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={testQueryClient}>
      <MemoryRouter initialEntries={['/login']}>
        {ui}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Fluxo de autenticação', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    })
    mockNavigate.mockClear()
  })

  it('renderiza o formulário de login corretamente', () => {
    renderWithProviders(<LoginPage />)

    expect(screen.getByText('Bem-vindo de volta')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('demo@onda.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('exibe erro com credenciais inválidas', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('demo@onda.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    await user.type(emailInput, 'errado@email.com')
    await user.type(passwordInput, 'senhaerrada')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('redireciona para o dashboard com credenciais corretas', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('demo@onda.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    await user.type(emailInput, 'demo@onda.com')
    await user.type(passwordInput, 'onda123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    }, { timeout: 3000 })

    const { isAuthenticated } = useAuthStore.getState()
    expect(isAuthenticated).toBe(true)
  })

  it('exibe erros de validação para campos vazios', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginPage />)

    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument()
    })
  })

  it('exibe erro de validação para e-mail inválido', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('demo@onda.com')
    await user.type(emailInput, 'nao-e-email')

    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/informe um e-mail válido/i)).toBeInTheDocument()
    })
  })
})
