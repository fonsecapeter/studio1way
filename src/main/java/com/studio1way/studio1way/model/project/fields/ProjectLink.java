package com.studio1way.studio1way.model.project.fields;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.Objects;

public class ProjectLink {

    private String url;
    private String text;

    public ProjectLink() {}

    public ProjectLink(String url, String text) {
        setUrl(url);
        setText(text);
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ObjectNode toResourceJson() {
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        node.put("url", url);
        node.put("text", text);
        return node;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        ProjectLink otherProjectLink = (ProjectLink) other;
        return (
            Objects.equals(url, otherProjectLink.getUrl()) &&
            Objects.equals(text, otherProjectLink.getText())
        );
    }
}
