import { apiClient } from '@/lib/api-client'
import type {
    Booking,
    BookingList,
    CreateBookingRequest,
    CreateEventTypeRequest,
    EventType,
    EventTypeList,
    OwnerProfile,
    SlotList,
} from '@/types/api'

export const publicApi = {
  listEventTypes: async () => {
    const { data } = await apiClient.get<EventTypeList>('/event-types')
    return data
  },
  listSlots: async (eventTypeId: string) => {
    const { data } = await apiClient.get<SlotList>(`/event-types/${eventTypeId}/slots`)
    return data
  },
  createBooking: async (payload: CreateBookingRequest) => {
    const { data } = await apiClient.post<Booking>('/bookings', payload)
    return data
  },
}

export const adminApi = {
  getOwner: async () => {
    const { data } = await apiClient.get<OwnerProfile>('/admin/owner')
    return data
  },
  createEventType: async (payload: CreateEventTypeRequest) => {
    const { data } = await apiClient.post<EventType>('/admin/event-types', payload)
    return data
  },
  listUpcomingBookings: async () => {
    const { data } = await apiClient.get<BookingList>('/admin/bookings/upcoming')
    return data
  },
}
