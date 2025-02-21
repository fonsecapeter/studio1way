package com.studio1way.studio1way.repository.project.resources;

public enum ProjectResource {
    MY_BRAIN {
        public String toString() {
            return "/app/src/main/resources/projects/my-brain.json";
        }
    },
    WORKBENCH {
        public String toString() {
            return "/app/src/main/resources/projects/workbench.json";
        }
    },
}
