import { ReactNode } from 'react'
import clsx from 'clsx'

interface LayoutProps {
  readonly children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  )
}

function Header() {
  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📔</span>
            <h1 className="text-2xl font-bold">Daily Dots</h1>
          </div>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Your personal journal & mood tracker
          </p>
        </div>
      </div>
    </header>
  )
}
