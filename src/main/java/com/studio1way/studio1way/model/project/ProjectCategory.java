package com.studio1way.studio1way.model.project;

public enum ProjectCategory {
    PAINTING {
        public String toString() {
            return "painting";
        }
    },
    WOODWORKING {
        public String toString() {
            return "woodworking";
        }
    },
    CERAMIC {
        public String toString() {
            return "ceramic";
        }
    },
    PHOTOGRAPHY {
        public String toString() {
            return "photography";
        }
    },
    DIGITAL {
        public String toString() {
            return "digital";
        }
    },
    THREE_D_PRINTING {
        public String toString() {
            return "3d printing";
        }
    }
}
