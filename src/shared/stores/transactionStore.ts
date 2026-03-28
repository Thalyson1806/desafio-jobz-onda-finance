import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../../mocks/transactions'
import type { Transaction } from '../types/transaction'

interface TransactionState {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
    }),
    { name: 'onda-transactions' }
  )
)
