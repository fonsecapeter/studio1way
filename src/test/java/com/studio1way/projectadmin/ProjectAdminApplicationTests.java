package com.studio1way.projectadmin;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.Test;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.context.WebServerApplicationContext;
import org.springframework.boot.web.server.WebServer;
import org.springframework.context.ConfigurableApplicationContext;

public class ProjectAdminApplicationTests {

    @Test
    public void mainStartsAndExitsCleanly() {
        assertThatCode(() -> ProjectAdminApplication.main(new String[] {}))
            .doesNotThrowAnyException();
    }

    @Test
    public void contextIsNotAWebServer() {
        ConfigurableApplicationContext context = new SpringApplicationBuilder(
            ProjectAdminApplication.class
        )
            .web(WebApplicationType.NONE)
            .run();

        assertThat(context).isNotInstanceOf(WebServerApplicationContext.class);
        assertThat(context.getBeansOfType(WebServer.class)).isEmpty();

        context.close();
        assertThat(context.isActive()).isFalse();
    }
}
