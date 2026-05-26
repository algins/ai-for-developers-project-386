import { QueryState } from '@/components/feedback/query-state'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdminOwner } from '@/hooks/use-api'
import { useTranslation } from 'react-i18next'

export function AdminOwnerPage() {
  const { t } = useTranslation()
  const { data, isLoading, error } = useAdminOwner()

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">{t('admin.owner.heading')}</h2>
        <p className="text-muted-foreground">{t('admin.owner.description')}</p>
      </div>

      <QueryState isLoading={isLoading} error={(error as Error) ?? null}>
        <Card>
          <CardHeader>
            <CardTitle>{data?.name}</CardTitle>
            <CardDescription>{t('admin.owner.ownerId', { id: data?.id ?? '-' })}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('admin.owner.email', { email: data?.email ?? t('common.unknown') })}</p>
          </CardContent>
        </Card>
      </QueryState>
    </section>
  )
}
