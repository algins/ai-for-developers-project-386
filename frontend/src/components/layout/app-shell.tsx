import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', labelKey: 'nav.public' },
  { to: '/owner/profile', labelKey: 'nav.adminOwner' },
  { to: '/admin/event-types', labelKey: 'nav.adminEventTypes' },
  { to: '/admin/bookings', labelKey: 'nav.adminBookings' },
]

export function AppShell({ children }: PropsWithChildren) {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-sm text-muted-foreground">{t('app.subtitle')}</p>
            <h1 className="text-lg font-semibold">{t('app.title')}</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-1.5 text-sm transition-colors',
                    isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                  )
                }
              >
                {t(link.labelKey)}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <Separator />
      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
    </div>
  )
}
