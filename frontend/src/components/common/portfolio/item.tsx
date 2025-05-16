import React from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { PortfolioIndexOtherProjectFragment } from "../../../__generated__/types";

export const PORTFOLIO_ITEM_CERAMIC_WARE_FRAGMENT = gql`
  fragment PortfolioItemCeramicWare on CeramicWare {
    id
    icon {
      half
      alt
    }
    name
  }
`;
export const PORTFOLIO_ITEM_OTHER_PROJECT_FRAGMENT = gql`
  fragment PortfolioItemOtherProject on OtherProject {
    id
    icon {
      half
      alt
    }
    name
  }
`;
export const PORTFOLIO_ITEM_PAINTING_FRAGMENT = gql`
  fragment PortfolioItemPainting on Painting {
    id
    icon {
      half
      alt
    }
    name
  }
`;
export const PORTFOLIO_ITEM_WOOD_WORK_FRAGMENT = gql`
  fragment PortfolioItemWoodWork on WoodWork {
    id
    icon {
      half
      alt
    }
    name
  }
`;

interface CodeProps {
  readonly project: PortfolioIndexOtherProjectFragment;
}

export const PortfolioItem = ({ project }: CodeProps) => (
  <Link to={`../project/${project.id}`}>
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
  </Link>
);

export default PortfolioItem;
