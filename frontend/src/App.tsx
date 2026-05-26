import { Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'
import { AdminBookingsPage } from '@/pages/admin/bookings-page'
import { AdminEventTypesPage } from '@/pages/admin/event-types-page'
import { AdminOwnerPage } from '@/pages/admin/owner-page'
import { BookingConfirmationPage } from '@/pages/public/booking-confirmation-page'
import { EventTypePage } from '@/pages/public/event-type-page'
import { HomePage } from '@/pages/public/home-page'
import { NotFoundPage } from '@/pages/shared/not-found-page'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event-types/:eventTypeId" element={<EventTypePage />} />
        <Route path="/booking/confirmation/:bookingId" element={<BookingConfirmationPage />} />

        <Route path="/owner/profile" element={<AdminOwnerPage />} />
        <Route path="/admin/event-types" element={<AdminEventTypesPage />} />
        <Route path="/admin/bookings" element={<AdminBookingsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}

export default App
