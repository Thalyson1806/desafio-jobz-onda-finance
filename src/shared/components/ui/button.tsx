import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-green text-brand-dark hover:bg-brand-green/90 active:scale-[0.98] shadow-lg shadow-brand-green/20 rounded-full',
        outline:
          'border border-brand-border bg-transparent text-white hover:bg-brand-surface hover:border-brand-green/50 rounded-full',
        ghost:
          'bg-transparent text-white hover:bg-brand-surface rounded-full',
        destructive:
          'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 rounded-full',
        secondary:
          'bg-brand-surface text-white hover:bg-white/10 border border-brand-border rounded-full',
      },
      size: {
        sm: 'h-8 px-4 text-sm',
        md: 'h-10 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
