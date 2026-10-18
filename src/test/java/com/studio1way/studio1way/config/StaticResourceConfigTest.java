package com.studio1way.studio1way.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class StaticResourceConfigTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void hashedAssetsAreCachedForGood() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders.get("/js/cache-test.js"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(
                MockMvcResultMatchers
                    .header()
                    .string("Cache-Control", "max-age=31536000, public, immutable")
            );
        mockMvc
            .perform(MockMvcRequestBuilders.get("/img/cache-test.txt"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(
                MockMvcResultMatchers
                    .header()
                    .string("Cache-Control", "max-age=31536000, public, immutable")
            );
    }

    @Test
    public void projectPhotosAreCachedBriefly() throws Exception {
        mockMvc
            .perform(MockMvcRequestBuilders.get("/img/projects/cache-test.txt"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(
                MockMvcResultMatchers
                    .header()
                    .string("Cache-Control", "max-age=604800, public")
            );
    }
}
