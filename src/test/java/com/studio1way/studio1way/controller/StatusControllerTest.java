package com.studio1way.studio1way.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(StatusController.class)
public class StatusControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void testGetStatus() throws Exception {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/_status")
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }
}
