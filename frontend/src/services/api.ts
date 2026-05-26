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
  listSlots: async () => {
    const { data } = await apiClient.get<SlotList>('/slots')
    return data
  },
  createBooking: async (payload: CreateBookingRequest) => {
    const { data } = await apiClient.post<Booking>('/bookings', payload)
    return data
  },
}

export const adminApi = {
  getOwner: async () => {
    const { data } = await apiClient.get<OwnerProfile>('/owner/profile')
    return data
  },
  createEventType: async (payload: CreateEventTypeRequest) => {
    const { data } = await apiClient.post<EventType>('/event-types', payload)
    return data
  },
  listUpcomingBookings: async () => {
    const { data } = await apiClient.get<BookingList>('/bookings')
    return data
  },
}
