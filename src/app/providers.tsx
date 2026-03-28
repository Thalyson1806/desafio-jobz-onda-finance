import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../shared/lib/queryClient'
import { Toaster } from '../shared/components/ui/toaster'
import { AppRouter } from './router'

export function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
