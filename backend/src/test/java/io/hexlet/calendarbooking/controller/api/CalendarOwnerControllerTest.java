package io.hexlet.calendarbooking.controller.api;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import io.hexlet.calendarbooking.service.UserService;
import io.hexlet.calendarbooking.util.ModelGenerator;

@WebMvcTest(CalendarOwnerController.class)
@Import(io.hexlet.calendarbooking.exception.GlobalExceptionHandler.class)
class CalendarOwnerControllerTest {
    private static final ModelGenerator MODEL_GENERATOR = new ModelGenerator();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void testShow() throws Exception {
        when(userService.getCalendarOwner())
            .thenReturn(MODEL_GENERATOR.createCalendarOwnerDTO());

        mockMvc.perform(get("/calendar-owner"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("2a5ef4ce-becf-4e27-b212-833b77f6116d"))
                .andExpect(jsonPath("$.name").value("Calendar Owner"))
                .andExpect(jsonPath("$.email").value("owner@example.com"));
    }
}
