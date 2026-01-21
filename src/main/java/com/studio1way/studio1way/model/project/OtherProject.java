package com.studio1way.studio1way.model.project;

import com.studio1way.studio1way.model.project.fields.ProjectImage;
import com.studio1way.studio1way.model.project.fields.ProjectLink;
import com.studio1way.studio1way.model.project.fields.ProjectVideo;
import java.util.Objects;

public class OtherProject extends Project {

    private ProjectVideo video;
    private String variety;

    public OtherProject() {}

    public OtherProject(
        String id,
        String name,
        ProjectImage icon,
        ProjectLink[] links,
        String date,
        String description,
        ProjectImage[] images,
        ProjectVideo video,
        String variety
    ) {
        super(id, name, icon, links, date, description, images);
        setVideo(video);
        setVariety(variety);
    }

    public OtherProject(
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

    public OtherProject(
        String id,
        String name,
        ProjectImage icon,
        ProjectLink[] links,
        String date,
        String description,
        ProjectImage[] images,
        ProjectVideo video
    ) {
        super(id, name, icon, links, date, description, images);
        setVideo(video);
    }

    public OtherProject(
        String id,
        String name,
        ProjectImage icon,
        ProjectLink[] links,
        String date,
        String description,
        ProjectImage[] images
    ) {
        super(id, name, icon, links, date, description, images);
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
        OtherProject otherProject = (OtherProject) other;
        return (
            super.equals(otherProject) &&
            Objects.equals(getVideo(), otherProject.getVideo()) &&
            Objects.equals(getVariety(), otherProject.getVariety())
        );
    }
}
