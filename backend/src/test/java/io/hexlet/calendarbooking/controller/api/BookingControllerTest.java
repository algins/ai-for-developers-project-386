package io.hexlet.calendarbooking.controller.api;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.hexlet.calendarbooking.dto.BookingCreateDTO;
import io.hexlet.calendarbooking.exception.ConflictException;
import io.hexlet.calendarbooking.service.BookingService;
import io.hexlet.calendarbooking.util.ModelGenerator;

@WebMvcTest(BookingController.class)
@Import(io.hexlet.calendarbooking.exception.GlobalExceptionHandler.class)
class BookingControllerTest {
    private static final ModelGenerator MODEL_GENERATOR = new ModelGenerator();

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private BookingService bookingService;

    @Test
    void testIndexUpcoming() throws Exception {
        var booking = MODEL_GENERATOR.createBookingDTO();

        when(bookingService.listUpcomingBookings()).thenReturn(List.of(booking));

        mockMvc.perform(get("/bookings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("b9facce4-44c0-4a7c-aac8-29e17f8ba2fb"))
                .andExpect(jsonPath("$[0].guestEmail").value("alice@example.com"));
    }

    @Test
    void testCreate() throws Exception {
        var request = MODEL_GENERATOR.createBookingCreateDTO();

        when(bookingService.createBooking(any(BookingCreateDTO.class)))
                .thenReturn(MODEL_GENERATOR.createBookingDTO());

        mockMvc.perform(post("/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("b9facce4-44c0-4a7c-aac8-29e17f8ba2fb"));
    }

    @Test
    void testCreateConflict() throws Exception {
        var request = MODEL_GENERATOR.createConflictingBookingCreateDTO();

        when(bookingService.createBooking(any(BookingCreateDTO.class)))
                .thenThrow(new ConflictException("Selected slot is already booked"));

        mockMvc.perform(post("/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("CONFLICT"));
    }
}
