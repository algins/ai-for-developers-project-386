package io.hexlet.calendarbooking.controller.api;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import io.hexlet.calendarbooking.service.SlotService;
import io.hexlet.calendarbooking.util.ModelGenerator;

@WebMvcTest(SlotController.class)
@Import(io.hexlet.calendarbooking.exception.GlobalExceptionHandler.class)
class SlotControllerTest {
    private static final ModelGenerator MODEL_GENERATOR = new ModelGenerator();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SlotService slotService;

    @Test
    void testIndex() throws Exception {
        var slot = MODEL_GENERATOR.createSlotDTO();

        when(slotService.listAvailableSlots()).thenReturn(List.of(slot));

        mockMvc.perform(get("/slots"))
                .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].isAvailable").value(true));
    }
}
