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

import io.hexlet.calendarbooking.dto.EventTypeCreateDTO;
import io.hexlet.calendarbooking.service.EventTypeService;
import io.hexlet.calendarbooking.util.ModelGenerator;

@WebMvcTest(EventTypeController.class)
@Import(io.hexlet.calendarbooking.exception.GlobalExceptionHandler.class)
class EventTypeControllerTest {
    private static final ModelGenerator MODEL_GENERATOR = new ModelGenerator();

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private EventTypeService eventTypeService;

    @Test
    void testIndex() throws Exception {
        var eventType = MODEL_GENERATOR.createEventTypeDTO();

        when(eventTypeService.listEventTypes()).thenReturn(List.of(eventType));

        mockMvc.perform(get("/event-types"))
                .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value("5e2cb43b-a9e0-4dda-a09f-040f11366549"))
            .andExpect(jsonPath("$[0].durationMinutes").value(30));
    }

    @Test
    void testCreate() throws Exception {
        var request = MODEL_GENERATOR.createEventTypeCreateDTO();

        when(eventTypeService.createEventType(any(EventTypeCreateDTO.class)))
                .thenReturn(MODEL_GENERATOR.createEventTypeDTO());

        mockMvc.perform(post("/event-types")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("5e2cb43b-a9e0-4dda-a09f-040f11366549"))
                .andExpect(jsonPath("$.name").value("Intro Call"));
    }
}
