import { zodResolver } from '@hookform/resolvers/zod'
import type { TFunction } from 'i18next'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { QueryState } from '@/components/feedback/query-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateBooking, usePublicEventTypes, usePublicSlots } from '@/hooks/use-api'
import { formatUtc } from '@/lib/date'

function createBookingSchema(t: TFunction) {
  return z.object({
    guestName: z
      .string()
      .min(1, t('public.eventType.validation.guestNameRequired'))
      .max(255, t('public.eventType.validation.guestNameMax', { max: 255 })),
    guestEmail: z.string().email(t('public.eventType.validation.guestEmailInvalid')),
    startTime: z.string().min(1, t('public.eventType.validation.startTimeRequired')),
  })
}

type BookingFormData = z.infer<ReturnType<typeof createBookingSchema>>

export function EventTypePage() {
  const { t } = useTranslation()
  const { eventTypeId } = useParams()
  const navigate = useNavigate()
  const createBooking = useCreateBooking()
  const eventTypesQuery = usePublicEventTypes()
  const slotsQuery = usePublicSlots(eventTypeId)
  const bookingSchema = createBookingSchema(t)

  const eventType = useMemo(
    () => eventTypesQuery.data?.items.find((item) => item.id === eventTypeId),
    [eventTypesQuery.data?.items, eventTypeId],
  )

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: '',
      guestEmail: '',
      startTime: '',
    },
  })

  const slots = slotsQuery.data?.items ?? []

  const onSubmit = form.handleSubmit(async (values) => {
    if (!eventTypeId) {
      return
    }

    try {
      const booking = await createBooking.mutateAsync({
        eventTypeId,
        guestName: values.guestName,
        guestEmail: values.guestEmail,
        startTime: values.startTime,
      })
      toast.success(t('public.eventType.toasts.created'))
      navigate(`/booking/confirmation/${booking.id}`, { state: { booking } })
    } catch (error) {
      const message = error instanceof Error ? error.message : t('public.eventType.toasts.createFailed')
      toast.error(message)
    }
  })

  return (
    <section className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>{eventType?.name ?? t('public.eventType.fallbackName')}</CardTitle>
          <CardDescription>{eventType?.description ?? t('public.eventType.fallbackDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>
              {eventType?.durationMinutes != null
                ? t('public.eventType.duration', { minutes: eventType.durationMinutes })
                : t('public.eventType.noDuration')}
            </strong>
          </p>
          <p className="text-muted-foreground">{t('public.eventType.bookingVia')} <code>POST /bookings</code>.</p>
        </CardContent>
      </Card>

      <QueryState
        isLoading={slotsQuery.isLoading}
        error={(slotsQuery.error as Error) ?? null}
        isEmpty={!slotsQuery.isLoading && slots.length === 0}
        emptyText={t('public.eventType.emptySlots')}
      >
        <Card>
          <CardHeader>
            <CardTitle>{t('public.eventType.guestDetails')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="guestName">{t('public.eventType.labels.guestName')}</Label>
                <Input id="guestName" {...form.register('guestName')} />
                {form.formState.errors.guestName && (
                  <p className="text-sm text-destructive">{form.formState.errors.guestName.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="guestEmail">{t('public.eventType.labels.guestEmail')}</Label>
                <Input id="guestEmail" type="email" {...form.register('guestEmail')} />
                {form.formState.errors.guestEmail && (
                  <p className="text-sm text-destructive">{form.formState.errors.guestEmail.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="startTime">{t('public.eventType.labels.startTime')}</Label>
                <select
                  id="startTime"
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  {...form.register('startTime')}
                >
                  <option value="">{t('public.eventType.placeholders.selectSlot')}</option>
                  {slots.map((slot) => (
                    <option key={slot.startTime} value={slot.startTime}>
                      {formatUtc(slot.startTime)} - {formatUtc(slot.endTime)}
                    </option>
                  ))}
                </select>
                {form.formState.errors.startTime && (
                  <p className="text-sm text-destructive">{form.formState.errors.startTime.message}</p>
                )}
              </div>

              <Button disabled={createBooking.isPending} type="submit">
                {createBooking.isPending ? t('public.eventType.actions.booking') : t('public.eventType.actions.confirmBooking')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </QueryState>
    </section>
  )
}
