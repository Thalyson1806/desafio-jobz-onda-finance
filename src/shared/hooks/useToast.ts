import * as React from 'react'
import type { ToastProps } from '../components/ui/toast'

interface ToastItem extends ToastProps {
  id: string
  title?: string
  description?: string
}

type ToastAction =
  | { type: 'ADD_TOAST'; toast: ToastItem }
  | { type: 'REMOVE_TOAST'; toastId: string }

interface ToastState {
  toasts: ToastItem[]
}

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return { toasts: [...state.toasts, action.toast] }
    case 'REMOVE_TOAST':
      return { toasts: state.toasts.filter((t) => t.id !== action.toastId) }
    default:
      return state
  }
}

const listeners: Array<(state: ToastState) => void> = []
let state: ToastState = { toasts: [] }

function dispatch(action: ToastAction) {
  state = toastReducer(state, action)
  listeners.forEach((listener) => listener(state))
}

let count = 0

function toast(props: Omit<ToastItem, 'id'>) {
  const id = String(++count)
  dispatch({
    type: 'ADD_TOAST',
    toast: { ...props, id, open: true, onOpenChange: (open) => {
      if (!open) dispatch({ type: 'REMOVE_TOAST', toastId: id })
    }},
  })
  setTimeout(() => {
    dispatch({ type: 'REMOVE_TOAST', toastId: id })
  }, 4000)
  return id
}

function useToast() {
  const [toastState, setToastState] = React.useState<ToastState>(state)

  React.useEffect(() => {
    listeners.push(setToastState)
    return () => {
      const index = listeners.indexOf(setToastState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return { toasts: toastState.toasts, toast }
}

export { useToast, toast }
