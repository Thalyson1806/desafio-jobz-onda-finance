import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={cn(
            'flex h-11 w-full rounded-xl border bg-brand-surface px-4 py-2 text-sm text-white placeholder:text-gray-500 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent',
            error
              ? 'border-red-500/50 focus:ring-red-500'
              : 'border-brand-border hover:border-brand-green/30',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-400">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
