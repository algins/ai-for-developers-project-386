import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { adminApi, publicApi } from '@/services/api'
import type { CreateBookingRequest, CreateEventTypeRequest } from '@/types/api'

export const queryKeys = {
  publicEventTypes: ['public', 'event-types'] as const,
  publicSlots: (eventTypeId: string) => ['public', 'slots', eventTypeId] as const,
  adminOwner: ['admin', 'owner'] as const,
  adminBookings: ['admin', 'bookings', 'upcoming'] as const,
}

export function usePublicEventTypes() {
  return useQuery({
    queryKey: queryKeys.publicEventTypes,
    queryFn: publicApi.listEventTypes,
  })
}

export function usePublicSlots(eventTypeId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.publicSlots(eventTypeId ?? ''),
    queryFn: () => publicApi.listSlots(eventTypeId ?? ''),
    enabled: Boolean(eventTypeId),
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateBookingRequest) => publicApi.createBooking(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.publicSlots(variables.eventTypeId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.adminBookings })
    },
  })
}

export function useAdminOwner() {
  return useQuery({
    queryKey: queryKeys.adminOwner,
    queryFn: adminApi.getOwner,
  })
}

export function useAdminBookings() {
  return useQuery({
    queryKey: queryKeys.adminBookings,
    queryFn: adminApi.listUpcomingBookings,
  })
}

export function useCreateEventType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateEventTypeRequest) => adminApi.createEventType(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.publicEventTypes })
    },
  })
}
