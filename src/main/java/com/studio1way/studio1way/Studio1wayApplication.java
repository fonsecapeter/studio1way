package com.studio1way.studio1way;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class Studio1wayApplication {

    public static void main(String[] args) {
        SpringApplication.run(Studio1wayApplication.class, args);
    }
}
