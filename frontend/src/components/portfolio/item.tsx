import React from "react";
import { gql } from "@apollo/client";
import { ProjectItemFragment } from "../../__generated__/types";

export const PROJECT_ITEM_FRAGMENT = gql`
  fragment ProjectItem on Project {
    id
    icon {
      half
      alt
    }
    name
  }
`;

interface CodeProps {
  readonly project: ProjectItemFragment;
}

export const PortfolioItem = ({ project }: CodeProps) => (
  <div className="portfolio-item">
    <div className="portfolio-item-icon">
      <img
        className="portfolio-item-icon-image"
        src={project.icon.half}
        alt={project.icon.alt}
      />
    </div>
    <div className="portfolio-item-content">
      <h3 className="portfolio-item-title">{project.name}</h3>
    </div>
  </div>
);

export default PortfolioItem;
