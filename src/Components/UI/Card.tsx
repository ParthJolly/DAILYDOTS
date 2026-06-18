import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  readonly children: ReactNode
  readonly className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'border border-border rounded-lg bg-card p-6 text-card-foreground shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  readonly children: ReactNode
  readonly className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={clsx('flex flex-col space-y-1.5', className)}>{children}</div>
}

interface CardTitleProps {
  readonly children: ReactNode
  readonly className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h2 className={clsx('text-2xl font-semibold leading-none tracking-tight', className)}>
      {children}
    </h2>
  )
}

interface CardDescriptionProps {
  readonly children: ReactNode
  readonly className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return <p className={clsx('text-sm text-muted-foreground', className)}>{children}</p>
}

interface CardContentProps {
  readonly children: ReactNode
  readonly className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={clsx('pt-0', className)}>{children}</div>
}

interface CardFooterProps {
  readonly children: ReactNode
  readonly className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={clsx('flex items-center pt-6', className)}>{children}</div>
  )
}
