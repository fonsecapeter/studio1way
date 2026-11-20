package com.studio1way.projectadmin;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.Test;

public class ProjectAdminCliTests {

    private record Run(int exitCode, String out, String err) {}

    private Run run(String... args) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        ByteArrayOutputStream err = new ByteArrayOutputStream();
        int exitCode = ProjectAdminCli.run(
            args,
            new PrintStream(out, true, StandardCharsets.UTF_8),
            new PrintStream(err, true, StandardCharsets.UTF_8)
        );
        return new Run(
            exitCode,
            out.toString(StandardCharsets.UTF_8),
            err.toString(StandardCharsets.UTF_8)
        );
    }

    @Test
    public void helpIsAShortIntroductionListingOnlyExperimentForDescribe() {
        Run run = run("--help");

        assertThat(run.exitCode()).isZero();
        assertThat(run.out()).contains("bin/add-project create <category> [flags]");
        assertThat(run.out()).contains("bin/add-project --describe experiment");
        assertThat(run.out()).doesNotContain("CreateExperimentalProjectInput");
        assertThat(run.out()).doesNotContain("WIDE");
    }

    @Test
    public void describeExperimentPrintsTheSchemaDerivedFlagSurfaceAndAnExample() {
        Run run = run("--describe", "experiment");

        assertThat(run.exitCode()).isZero();
        assertThat(run.out()).contains("--name <String> (required)");
        assertThat(run.out()).contains("--variety <String> (required)");
        assertThat(run.out())
            .contains("--video-aspect-ratio <VideoAspectRatio> (required)");
        assertThat(run.out()).contains("WIDE, FULL");
        assertThat(run.out()).contains("--image-source-path <String> (required)");
        assertThat(run.out()).contains("--link-url <String> (required)");
        assertThat(run.out()).contains("bin/add-project create experiment");
    }

    @Test
    public void describeWithAnUnknownCategoryFailsAndListsSupportedCategories() {
        Run run = run("--describe", "woodwork");

        assertThat(run.exitCode()).isEqualTo(1);
        assertThat(run.err()).contains("Unknown category: woodwork");
        assertThat(run.err()).contains("experiment");
    }

    @Test
    public void describeWithoutACategoryFails() {
        Run run = run("--describe");

        assertThat(run.exitCode()).isEqualTo(1);
        assertThat(run.err()).contains("Usage: bin/add-project --describe <category>");
    }

    @Test
    public void unsupportedArgumentsFail() {
        Run run = run("create", "experiment");

        assertThat(run.exitCode()).isEqualTo(1);
        assertThat(run.err()).contains("Unsupported arguments");
        assertThat(run.err()).contains("bin/add-project --help");
    }
}
