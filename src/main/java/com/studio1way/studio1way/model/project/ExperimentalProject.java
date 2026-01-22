package com.studio1way.studio1way.model.project;

import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.model.project.fields.ProjectVideo;
import java.util.Objects;

public class ExperimentalProject extends Project {

    private String variety;
    private ProjectVideo video;

    public ExperimentalProject() {}

    public ExperimentalProject(
        String id,
        String name,
        ProjectImage icon,
        ProjectLink[] links,
        String date,
        String description,
        ProjectImage[] images,
        String variety,
        ProjectVideo video
    ) {
        super(id, name, icon, links, date, description, images);
        setVariety(variety);
        setVideo(video);
    }

    public ExperimentalProject(
        String id,
        String name,
        ProjectImage icon,
        ProjectLink[] links,
        String date,
        String description,
        ProjectImage[] images,
        String variety
    ) {
        super(id, name, icon, links, date, description, images);
        setVariety(variety);
    }

    public ProjectVideo getVideo() {
        return video;
    }

    public void setVideo(ProjectVideo video) {
        this.video = video;
    }

    public String getVariety() {
        return variety;
    }

    public void setVariety(String variety) {
        this.variety = variety;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        ExperimentalProject otherProject = (ExperimentalProject) other;
        return (
            super.equals(otherProject) &&
            Objects.equals(getVideo(), otherProject.getVideo()) &&
            Objects.equals(getVariety(), otherProject.getVariety())
        );
    }
}
