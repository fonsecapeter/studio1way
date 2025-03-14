import React from "react";
import { gql } from "@apollo/client";
import { OtherProjectItemFragment } from "../../__generated__/types";

export const CERAMIC_WARE_ITEM_FRAGMENT = gql`
  fragment CeramicWareItem on CeramicWare {
    id
    icon {
      half
      alt
    }
    name
  }
`;
export const OTHER_PROJECT_ITEM_FRAGMENT = gql`
  fragment OtherProjectItem on OtherProject {
    id
    icon {
      half
      alt
    }
    name
  }
`;
export const PAINTING_ITEM_FRAGMENT = gql`
  fragment PaintingItem on Painting {
    id
    icon {
      half
      alt
    }
    name
  }
`;
export const WOOD_WORK_ITEM_FRAGMENT = gql`
  fragment WoodWorkItem on WoodWork {
    id
    icon {
      half
      alt
    }
    name
  }
`;

interface CodeProps {
  readonly project: OtherProjectItemFragment;
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
