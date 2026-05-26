import { QueryState } from '@/components/feedback/query-state'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAdminBookings } from '@/hooks/use-api'
import { formatUtc } from '@/lib/date'
import { useTranslation } from 'react-i18next'

export function AdminBookingsPage() {
  const { t } = useTranslation()
  const { data, isLoading, error } = useAdminBookings()
  const items = data?.items ?? []

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">{t('admin.bookings.heading')}</h2>
        <p className="text-muted-foreground">{t('admin.bookings.description')}</p>
      </div>

      <QueryState
        isLoading={isLoading}
        error={(error as Error) ?? null}
        isEmpty={!isLoading && items.length === 0}
        emptyText={t('admin.bookings.empty')}
      >
        <div className="rounded-lg border bg-card p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.bookings.columns.guest')}</TableHead>
                <TableHead>{t('admin.bookings.columns.email')}</TableHead>
                <TableHead>{t('admin.bookings.columns.starts')}</TableHead>
                <TableHead>{t('admin.bookings.columns.ends')}</TableHead>
                <TableHead>{t('admin.bookings.columns.eventTypeId')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.guestName}</TableCell>
                  <TableCell>{item.guestEmail}</TableCell>
                  <TableCell>{formatUtc(item.startTime)}</TableCell>
                  <TableCell>{formatUtc(item.endTime)}</TableCell>
                  <TableCell className="font-mono text-xs">{item.eventTypeId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </QueryState>
    </section>
  )
}
