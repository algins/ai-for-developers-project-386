import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/app-shell'

const HomePage = lazy(() => import('@/pages/public/home-page').then((module) => ({ default: module.HomePage })))
const EventTypePage = lazy(() =>
  import('@/pages/public/event-type-page').then((module) => ({ default: module.EventTypePage })),
)
const BookingConfirmationPage = lazy(() =>
  import('@/pages/public/booking-confirmation-page').then((module) => ({ default: module.BookingConfirmationPage })),
)
const AdminOwnerPage = lazy(() =>
  import('@/pages/admin/owner-page').then((module) => ({ default: module.AdminOwnerPage })),
)
const AdminEventTypesPage = lazy(() =>
  import('@/pages/admin/event-types-page').then((module) => ({ default: module.AdminEventTypesPage })),
)
const AdminBookingsPage = lazy(() =>
  import('@/pages/admin/bookings-page').then((module) => ({ default: module.AdminBookingsPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/shared/not-found-page').then((module) => ({ default: module.NotFoundPage })),
)

function App() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event-types/:eventTypeId" element={<EventTypePage />} />
          <Route path="/booking/confirmation/:bookingId" element={<BookingConfirmationPage />} />

          <Route path="/owner/profile" element={<AdminOwnerPage />} />
          <Route path="/admin/event-types" element={<AdminEventTypesPage />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}

export default App
