// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import {
  PortfolioDetailCeramicWareFragment,
  PortfolioDetailOtherProjectFragment,
  PortfolioDetailPaintingFragment,
  PortfolioDetailWoodWorkFragment,
} from "../../../__generated__/types";
import Carousel from "../image/carousel";
import { isCeramicWare, isPainting, isWoodWork } from "../../../utils";

export const PORTFOLIO_DETAIL_CERAMIC_WARE_FRAGMENT = gql`
  fragment PortfolioDetailCeramicWare on CeramicWare {
    name
    date
    description
    links {
      url
      text
    }
    images {
      full
      half
      quarter
      alt
      neverOverlap
      animation {
        full
        half
        alt
      }
    }
    clayBody
    glaze
  }
`;

export const PORTFOLIO_DETAIL_OTHER_PROJECT_FRAGMENT = gql`
  fragment PortfolioDetailOtherProject on OtherProject {
    name
    date
    description
    links {
      url
      text
    }
    images {
      full
      half
      quarter
      alt
      neverOverlap
      animation {
        full
        half
        alt
      }
    }
  }
`;

export const PORTFOLIO_DETAIL_PAINTING_FRAGMENT = gql`
  fragment PortfolioDetailPainting on Painting {
    name
    date
    description
    links {
      url
      text
    }
    images {
      full
      half
      quarter
      alt
      neverOverlap
      animation {
        full
        half
        alt
      }
    }
    medium
    surface
    varnished
  }
`;

export const PORTFOLIO_DETAIL_WOOD_WORK_FRAGMENT = gql`
  fragment PortfolioDetailWoodWork on WoodWork {
    name
    date
    description
    links {
      url
      text
    }
    images {
      full
      half
      quarter
      alt
      neverOverlap
      animation {
        full
        half
        alt
      }
    }
    materials
    finish
  }
`;

interface PortfolioDetailParams {
  readonly project:
    | PortfolioDetailCeramicWareFragment
    | PortfolioDetailPaintingFragment
    | PortfolioDetailWoodWorkFragment
    | PortfolioDetailOtherProjectFragment;
}

export const PortfolioDetail = ({ project }: PortfolioDetailParams) => {
  const properties = [project.date];
  if (isCeramicWare(project)) {
    properties.push(`${project.clayBody} with ${project.glaze} glaze`);
  } else if (isPainting(project)) {
    const paintingDetails = `${project.medium} on ${project.surface}`;
    if (project.varnished) {
      properties.push(paintingDetails + " (varnished)");
    } else {
      properties.push(paintingDetails);
    }
  } else if (isWoodWork(project)) {
    properties.push(`${project.finish} on ${project.materials}`);
  }

  const linkClass = "portfolio-detail-link";
  let links = null;
  if (project.links.length > 0) {
    links = (
      <span>
        <a href={project.links[0].url} className={linkClass} target="blank">
          {project.links[0].text}
        </a>
        {project.links.slice(1).map((projectLink) => (
          <span key={projectLink.url}>
            <span className="portfolio-detail-dot">·</span>
            <a href={projectLink.url} className={linkClass} target="blank">
              {projectLink.text}
            </a>
          </span>
        ))}
      </span>
    );
  }

  return (
    <div>
      <div className="landing-title-row">
        <h1 className="page-title">{project.name}</h1>
        <Link to="/portfolio">
          <button className="button-link">← PORTFOLIO</button>
        </Link>
      </div>
      <div className="portfolio-detail-media">
        <div className="portfolio-detail-media-carousel">
          <Carousel images={project.images} />
        </div>
      </div>
      {properties.map((property, idx) => (
        <p className="portfolio-detail-property" key={idx}>
          {property}
        </p>
      ))}
      <div>{links}</div>
      <p>{project.description}</p>
      <p>🚧 this part of the site under construction 🚧</p>
    </div>
  );
};

export default PortfolioDetail; // for dynamic import
