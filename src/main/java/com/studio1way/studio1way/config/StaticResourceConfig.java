package com.studio1way.studio1way.config;

import java.util.concurrent.TimeUnit;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Bundles, fonts, and imported images have content hashes in
        // their file names, so a changed file gets a new URL and these
        // can be cached for good.
        registry
            .addResourceHandler("/js/**")
            .addResourceLocations("classpath:/static/js/")
            .setCacheControl(
                CacheControl.maxAge(365, TimeUnit.DAYS).cachePublic().immutable()
            );
        registry
            .addResourceHandler("/fonts/*", "/img/*")
            .addResourceLocations("classpath:/static/fonts/", "classpath:/static/img/")
            .setCacheControl(
                CacheControl.maxAge(365, TimeUnit.DAYS).cachePublic().immutable()
            );
        // Project photos live at stable URLs (a replaced photo keeps
        // its path), so keep their cache lifetime short.
        registry
            .addResourceHandler("/img/projects/**")
            .addResourceLocations("classpath:/static/img/projects/")
            .setCacheControl(CacheControl.maxAge(7, TimeUnit.DAYS).cachePublic());
    }
}
