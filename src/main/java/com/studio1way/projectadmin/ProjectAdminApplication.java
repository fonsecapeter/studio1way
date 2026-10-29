package com.studio1way.projectadmin;

import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class ProjectAdminApplication {

    public static void main(String[] args) {
        new SpringApplicationBuilder(ProjectAdminApplication.class)
            .web(WebApplicationType.NONE)
            .run(args)
            .close();
    }
}
