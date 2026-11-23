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
    public void helpIsAShortIntroductionListingDescribeCommands() {
        Run run = run("--help");

        assertThat(run.exitCode()).isZero();
        assertThat(run.out()).contains("bin/add-project create <category> [flags]");
        assertThat(run.out()).contains("bin/add-project --describe experiment");
        assertThat(run.out()).contains("bin/add-project --describe woodwork");
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
    public void describeWoodWorkPrintsTheSchemaDerivedFlagSurfaceAndAnExample() {
        Run run = run("--describe", "woodwork");

        assertThat(run.exitCode()).isZero();
        assertThat(run.out()).contains("--materials <String> (required)");
        assertThat(run.out())
            .contains(
                "--finish <WoodWorkFinish> (required) (one of: PASTE_WAX, VARNISH, ACRYLIC_PAINT_AND_PASTE_WAX, TUNG_OIL)"
            );
        assertThat(run.out()).contains("--dimensions-height <Float> (required)");
        assertThat(run.out()).contains("--dimensions-width <Float> (required)");
        assertThat(run.out()).contains("--dimensions-depth <Float> (required)");
        assertThat(run.out()).contains("bin/add-project create woodwork");
    }

    @Test
    public void describeWithAnUnknownCategoryFailsAndListsSupportedCategories() {
        Run run = run("--describe", "bogus");

        assertThat(run.exitCode()).isEqualTo(1);
        assertThat(run.err()).contains("Unknown category: bogus");
        assertThat(run.err()).contains("experiment");
    }

    @Test
    public void describeWithoutACategoryFails() {
        Run run = run("--describe");

        assertThat(run.exitCode()).isEqualTo(1);
        assertThat(run.err()).contains("Usage: bin/add-project --describe <category>");
    }

    @Test
    public void createExperimentIsNotSupportedYet() {
        Run run = run("create", "experiment");

        assertThat(run.exitCode()).isEqualTo(1);
        assertThat(run.err())
            .contains("Create is not supported yet for category: experiment");
    }

    @Test
    public void createWithAnUnknownFlagFailsAndListsValidFlags() {
        Run run = run("create", "woodwork", "--bogus", "x");

        assertThat(run.exitCode()).isEqualTo(1);
        assertThat(run.err()).contains("Unknown flag: --bogus");
        assertThat(run.err()).contains("--finish");
    }

    @Test
    public void createWithAMissingFlagValueFails() {
        Run run = run("create", "woodwork", "--name");

        assertThat(run.exitCode()).isEqualTo(1);
        assertThat(run.err()).contains("Flag --name expects a value");
    }

    @Test
    public void unsupportedArgumentsFail() {
        Run run = run("frobnicate");

        assertThat(run.exitCode()).isEqualTo(1);
        assertThat(run.err()).contains("Unsupported arguments");
        assertThat(run.err()).contains("bin/add-project --help");
    }
}
