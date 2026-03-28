import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BalanceState {
  balance: number
  deduct: (amount: number) => void
  credit: (amount: number) => void
  reset: () => void
}

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set) => ({
      balance: 12500.0,
      deduct: (amount) =>
        set((state) => ({
          balance: state.balance - amount,
        })),
      credit: (amount) =>
        set((state) => ({
          balance: state.balance + amount,
        })),
      reset: () => set({ balance: 12500.0 }),
    }),
    {
      name: 'onda-balance',
    }
  )
)
