import { cn } from '../lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: { emoji: 'text-xl', text: 'text-base' },
    md: { emoji: 'text-2xl', text: 'text-xl' },
    lg: { emoji: 'text-4xl', text: 'text-3xl' },
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={sizes[size].emoji}>🌊</span>
      <span
        className={cn(
          'font-bold tracking-tight',
          sizes[size].text,
          'text-white'
        )}
      >
        Onda{' '}
        <span className="text-brand-green">Finance</span>
      </span>
    </div>
  )
}
