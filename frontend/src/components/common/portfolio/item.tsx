import React from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { PortfolioIndexProjectFragment } from "./index";
import { CATEGORY } from "../../../utils";
import ImagePlaceholder from "../image/placeholder";

export const PORTFOLIO_ITEM_CERAMIC_WARE_FRAGMENT = gql`
  fragment PortfolioItemCeramicWare on CeramicWare {
    id
    icon {
      half
      alt
      animation {
        half
      }
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
      animation {
        half
      }
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
      animation {
        half
      }
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
      animation {
        half
      }
    }
    name
  }
`;

interface CodeProps {
  readonly project: PortfolioIndexProjectFragment;
  readonly iconPreloaded: boolean;
}

export const PortfolioItem = ({ project, iconPreloaded }: CodeProps) => {
  const iconSrc = project.icon.animation?.half ?? project.icon.half;
  let detailPath;
  switch (project.__typename) {
    case CATEGORY.CERAMIC_WARE:
      detailPath = `/ceramics/project/${project.id}`;
      break;
    case CATEGORY.PAINTING:
      detailPath = `/paint/project/${project.id}`;
      break;
    case CATEGORY.WOOD_WORK:
      detailPath = `/wood/project/${project.id}`;
      break;
    default:
      detailPath = `/other/project/${project.id}`;
      break;
  }
  return (
    <Link to={detailPath} data-testid="portfolio-item-link">
      <div className="portfolio-item">
        <div className="portfolio-item-icon">
          {iconPreloaded ? (
            <img
              className="portfolio-item-icon-image"
              src={iconSrc}
              alt={project.icon.alt}
            />
          ) : (
            <div className="portfolio-item-icon-image">
              <ImagePlaceholder height={200} />
            </div>
          )}
        </div>
        <div className="portfolio-item-content">
          <h3 className="portfolio-item-title">{project.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioItem;
