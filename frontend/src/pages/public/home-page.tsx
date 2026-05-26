import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { QueryState } from '@/components/feedback/query-state'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePublicEventTypes } from '@/hooks/use-api'

export function HomePage() {
  const { t } = useTranslation()
  const { data, isLoading, error } = usePublicEventTypes()
  const items = data?.items ?? []

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">{t('public.home.heading')}</h2>
        <p className="text-muted-foreground">
          {t('public.home.flowPrefix')} <code>GET /event-types</code> {t('public.home.flowAnd')} <code>GET /slots</code>.
        </p>
      </div>

      <QueryState
        isLoading={isLoading}
        error={(error as Error) ?? null}
        isEmpty={!isLoading && items.length === 0}
        emptyText={t('public.home.empty')}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <span>{item.name}</span>
                  <Badge variant="secondary">{t('public.home.durationBadge', { minutes: item.durationMinutes })}</Badge>
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link className="text-sm font-medium text-primary underline-offset-4 hover:underline" to={`/event-types/${item.id}`}>
                  {t('public.home.openSlots')}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </QueryState>
    </section>
  )
}
