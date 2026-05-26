const en = {
  app: {
    title: 'Calendar Booking Service',
    subtitle: 'Contract-Driven Frontend',
  },
  nav: {
    public: 'Public',
    adminOwner: 'Admin owner',
    adminEventTypes: 'Admin event types',
    adminBookings: 'Admin bookings',
  },
  common: {
    requestFailed: 'Request failed',
    emptyState: 'Empty state',
    noDataYet: 'No data yet.',
    unknown: 'Unknown',
  },
  admin: {
    owner: {
      heading: 'Admin owner profile',
      description: 'Review the account details for the booking owner.',
      ownerId: 'Owner ID: {{id}}',
      email: 'Email: {{email}}',
    },
    bookings: {
      heading: 'Upcoming bookings',
      description: 'Monitor upcoming reservations across all published event types.',
      empty: 'No upcoming bookings.',
      columns: {
        guest: 'Guest',
        email: 'Email',
        starts: 'Starts',
        ends: 'Ends',
        eventTypeId: 'Event type ID',
      },
    },
    eventTypes: {
      heading: 'Create event type',
      description: 'Define a new bookable event type with contract-validated fields.',
      cardTitle: 'New event type',
      cardDescription: 'All field constraints follow the OpenAPI contract.',
      labels: {
        name: 'Name',
        description: 'Description',
        durationMinutes: 'Duration (minutes)',
      },
      actions: {
        create: 'Create event type',
        creating: 'Creating...',
      },
      toasts: {
        created: 'Event type created: {{name}}',
        createFailed: 'Failed to create event type',
      },
      validation: {
        nameRequired: 'Name is required.',
        nameMax: 'Name must be at most {{max}} characters.',
        descriptionMax: 'Description must be at most {{max}} characters.',
        durationMin: 'Duration must be at least {{min}} minutes.',
        durationMax: 'Duration must be at most {{max}} minutes.',
      },
    },
  },
  public: {
    home: {
      heading: 'Book an event',
      flowPrefix: 'Public flow uses',
      flowAnd: 'and',
      empty: 'No event types are available yet.',
      openSlots: 'Open available slots',
      durationBadge: '{{minutes}} min',
    },
    eventType: {
      fallbackName: 'Event type',
      fallbackDescription: 'Pick a slot and submit booking details.',
      duration: 'Duration: {{minutes}} minutes',
      noDuration: 'Duration: - minutes',
      bookingVia: 'Booking is done via',
      emptySlots: 'No free slots in the 14-day window.',
      guestDetails: 'Guest details',
      labels: {
        guestName: 'Guest name',
        guestEmail: 'Guest email',
        startTime: 'Available slot',
      },
      placeholders: {
        selectSlot: 'Select slot',
      },
      actions: {
        confirmBooking: 'Confirm booking',
        booking: 'Booking...',
      },
      toasts: {
        created: 'Booking created',
        createFailed: 'Failed to create booking',
      },
      validation: {
        guestNameRequired: 'Guest name is required.',
        guestNameMax: 'Guest name must be at most {{max}} characters.',
        guestEmailInvalid: 'Enter a valid email address.',
        startTimeRequired: 'Select a time slot',
      },
    },
    bookingConfirmation: {
      title: 'Booking confirmed',
      bookingIdLabel: 'Booking ID:',
      guestLabel: 'Guest:',
      emailLabel: 'Email:',
      startTimeLabel: 'Start time:',
      bookingId: 'Booking ID: {{bookingId}}',
      guest: 'Guest: {{value}}',
      email: 'Email: {{value}}',
      startTime: 'Start time: {{value}}',
    },
  },
  notFound: {
    title: 'Page not found',
    description: 'Route is not configured in this frontend app.',
    goHome: 'Go to homepage',
  },
}

export default en
