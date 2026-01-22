// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import {
  PortfolioDetailCeramicWareFragment,
  PortfolioDetailExperimentalProjectFragment,
  PortfolioDetailPaintingFragment,
  PortfolioDetailWoodWorkFragment,
} from "../../../__generated__/types";
import Carousel from "../image/carousel";
import {
  isCeramicWare,
  isPainting,
  isWoodWork,
  isExperimentalProject,
} from "../../../utils";

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

export const PORTFOLIO_DETAIL_EXPERIMENTAL_PROJECT_FRAGMENT = gql`
  fragment PortfolioDetailExperimentalProject on ExperimentalProject {
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
    video {
      src
      aspectRatio
    }
    variety
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
    | PortfolioDetailExperimentalProjectFragment;
  readonly selectedPortfolioDepartments: string;
}

export const PortfolioDetail = ({
  project,
  selectedPortfolioDepartments,
}: PortfolioDetailParams) => {
  let media = null;
  let categoryTag = "experiment";
  let philosophyPath = "/experimental";
  const properties = [project.date];
  if (project.images.length > 0) {
    media = (
      <div className="portfolio-detail-media-carousel">
        <Carousel images={project.images} />
      </div>
    );
  }
  if (isCeramicWare(project)) {
    categoryTag = "ceramicware";
    philosophyPath = "/ceramics";
    properties.push(`${project.clayBody} with ${project.glaze} glaze`);
  } else if (isPainting(project)) {
    categoryTag = "painting";
    philosophyPath = "/paint";
    const paintingDetails = `${project.medium} on ${project.surface}`;
    if (project.varnished) {
      properties.push(paintingDetails + " (varnished)");
    } else {
      properties.push(paintingDetails);
    }
  } else if (isWoodWork(project)) {
    categoryTag = "woodwork";
    philosophyPath = "/wood";
    properties.push(`${project.finish} on ${project.materials}`);
  } else if (isExperimentalProject(project)) {
    properties.push(project.variety);
    if (project.video) {
      media = (
        <iframe
          data-testid="portfolio-detail-vid"
          className={`portfolio-detail-media-vid-${project.video.aspectRatio}`}
          src={project.video.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={true}
        ></iframe>
      );
    }
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

  const portfolioLink: { pathname: string; search?: string } = {
    pathname: "/portfolio",
  };
  if (selectedPortfolioDepartments) {
    portfolioLink.search = `?dept=${selectedPortfolioDepartments}`;
  }

  return (
    <div>
      <div className="landing-title-row">
        <h1 className="page-title">{project.name}</h1>
        <Link to={portfolioLink}>
          <button className="button-link">← PORTFOLIO</button>
        </Link>
      </div>
      <div className="portfolio-detail-media">{media}</div>
      {properties.map((property, idx) => (
        <p className="portfolio-detail-property" key={idx}>
          {property}
        </p>
      ))}
      <div>{links}</div>
      <p>{project.description}</p>
      <p className="portfolio-detail-property">{categoryTag}</p>
      <Link to={philosophyPath}>
        <button className="button-link">PHILOSOPHY →</button>
      </Link>
    </div>
  );
};

export default PortfolioDetail; // for dynamic import
