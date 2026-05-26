package io.hexlet.calendarbooking.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.hexlet.calendarbooking.dto.BookingCreateDTO;
import io.hexlet.calendarbooking.dto.BookingDTO;
import io.hexlet.calendarbooking.service.BookingService;
import jakarta.validation.Valid;

@RestController
@RequestMapping
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/bookings")
    @ResponseStatus(HttpStatus.OK)
    public List<BookingDTO> index() {
        return bookingService.listUpcomingBookings();
    }

    @PostMapping("/bookings")
    @ResponseStatus(HttpStatus.CREATED)
    public BookingDTO create(@Valid @RequestBody BookingCreateDTO dto) {
        return bookingService.createBooking(dto);
    }
}
