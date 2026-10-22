package com.studio1way.studio1way.controller;

import static org.hamcrest.Matchers.containsString;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(CodingPhilosophyController.class)
public class CodingPhilosophyControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void testGetCodingPhilosophy() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders.get("/coding-philosophy.md"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(
                MockMvcResultMatchers.content().contentTypeCompatibleWith("text/markdown")
            )
            .andExpect(
                MockMvcResultMatchers
                    .content()
                    .string(containsString("Under construction"))
            );
    }
}
