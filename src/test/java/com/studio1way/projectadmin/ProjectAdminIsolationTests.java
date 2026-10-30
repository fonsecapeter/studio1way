package com.studio1way.projectadmin;

import static org.assertj.core.api.Assertions.assertThat;

import com.studio1way.studio1way.Studio1wayApplication;
import java.util.Arrays;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.graphql.execution.GraphQlSource;

@SpringBootTest(classes = Studio1wayApplication.class)
public class ProjectAdminIsolationTests {

    @Autowired
    private ApplicationContext context;

    @Autowired
    private GraphQlSource graphQlSource;

    @Test
    public void publicGraphQlSchemaHasNoMutationType() {
        assertThat(graphQlSource.schema().getMutationType()).isNull();
    }

    @Test
    public void publicContextContainsNoAuthoringBeans() {
        boolean hasAuthoringBean = Arrays.stream(context.getBeanDefinitionNames())
            .map(context::getType)
            .anyMatch(
                type -> type != null && type.getPackageName().startsWith("com.studio1way.projectadmin")
            );

        assertThat(hasAuthoringBean).isFalse();
    }
}
