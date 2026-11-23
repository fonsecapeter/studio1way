package com.studio1way.projectadmin.create;

import com.studio1way.studio1way.AppRoot;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;

public final class ScriptDerivativeGenerator implements DerivativeGenerator {

    @Override
    public void generate(Path imageDir) throws IOException {
        Path relative = Path.of(AppRoot.PATH).relativize(imageDir);
        run("bin/resize-img", relative);
        run("bin/encode-img", relative);
    }

    private static void run(String script, Path imageDir) throws IOException {
        Process process;
        try {
            process =
                new ProcessBuilder("bash", script, imageDir.toString())
                    .directory(new File(AppRoot.PATH))
                    .redirectErrorStream(true)
                    .start();
        } catch (IOException e) {
            throw new IOException("Could not run " + script + ": " + e.getMessage(), e);
        }
        String output = new String(
            process.getInputStream().readAllBytes(),
            StandardCharsets.UTF_8
        );
        int exitCode;
        try {
            exitCode = process.waitFor();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("Interrupted running " + script, e);
        }
        if (exitCode != 0) {
            throw new IOException(
                script + " failed for " + imageDir + ":\n" + output.strip()
            );
        }
    }
}
