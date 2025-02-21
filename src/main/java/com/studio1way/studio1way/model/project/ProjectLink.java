package com.studio1way.studio1way.model.project;

public class ProjectLink {

    private String url;
    private String text;

    public ProjectLink(String url, String text) {
        this.url = url;
        this.text = text;
    }

    public String getUrl() {
        return this.url;
    }

    public String getText() {
        return this.text;
    }
}
