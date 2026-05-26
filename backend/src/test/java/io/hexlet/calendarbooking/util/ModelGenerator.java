package io.hexlet.calendarbooking.util;

import java.time.Instant;
import java.util.UUID;

import io.hexlet.calendarbooking.dto.BookingCreateDTO;
import io.hexlet.calendarbooking.dto.BookingDTO;
import io.hexlet.calendarbooking.dto.EventTypeCreateDTO;
import io.hexlet.calendarbooking.dto.EventTypeDTO;
import io.hexlet.calendarbooking.dto.SlotDTO;
import io.hexlet.calendarbooking.dto.UserDTO;
import io.hexlet.calendarbooking.model.Booking;
import io.hexlet.calendarbooking.model.EventType;

public class ModelGenerator {

    public Booking createBookingModel() {
        return new Booking(
            UUID.fromString("b9facce4-44c0-4a7c-aac8-29e17f8ba2fb"),
            UUID.fromString("5e2cb43b-a9e0-4dda-a09f-040f11366549"),
            "Alice",
            "alice@example.com",
            Instant.parse("2026-05-27T09:00:00Z"),
            Instant.parse("2026-05-27T09:30:00Z"),
            Instant.parse("2026-05-26T08:00:00Z")
        );
    }

    public EventType createEventTypeModel() {
        return new EventType(
            UUID.fromString("5e2cb43b-a9e0-4dda-a09f-040f11366549"),
            "Intro Call",
            "A short introduction call",
            30
        );
    }

    public BookingDTO createBookingDTO() {
        var booking = createBookingModel();

        return new BookingDTO(
            booking.getId(),
            booking.getEventTypeId(),
            booking.getGuestName(),
            booking.getGuestEmail(),
            booking.getStartTime(),
            booking.getEndTime(),
            booking.getCreatedAt()
        );
    }

    public EventTypeDTO createEventTypeDTO() {
        var eventType = createEventTypeModel();

        return new EventTypeDTO(
            eventType.getId(),
            eventType.getName(),
            eventType.getDescription(),
            eventType.getDurationMinutes()
        );
    }

    public SlotDTO createSlotDTO() {
        return new SlotDTO(
            Instant.parse("2026-05-27T09:00:00Z"),
            Instant.parse("2026-05-27T09:30:00Z"),
            true
        );
    }

    public BookingCreateDTO createBookingCreateDTO() {
        var eventType = createEventTypeModel();

        return new BookingCreateDTO(
            eventType.getId(),
            "Alice",
            "alice@example.com",
            Instant.parse("2026-05-27T09:00:00Z")
        );
    }

    public BookingCreateDTO createConflictingBookingCreateDTO() {
        var eventType = createEventTypeModel();

        return new BookingCreateDTO(
            eventType.getId(),
            "Bob",
            "bob@example.com",
            Instant.parse("2026-05-27T09:00:00Z")
        );
    }

    public EventTypeCreateDTO createEventTypeCreateDTO() {
        return new EventTypeCreateDTO(
            "Intro Call",
            "A short introduction call",
            30
        );
    }

    public UserDTO createCalendarOwnerDTO() {
        return new UserDTO(
            "2a5ef4ce-becf-4e27-b212-833b77f6116d",
            "Calendar Owner",
            "owner@example.com"
        );
    }
}
