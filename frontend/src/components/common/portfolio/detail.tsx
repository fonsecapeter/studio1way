// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { PortfolioDetailOtherProjectFragment } from "../../../__generated__/types";
import Carousel from "../image/carousel";

export const PORTFOLIO_DETAIL_CERAMIC_WARE_FRAGMENT = gql`
  fragment PortfolioDetailCeramicWare on CeramicWare {
    name
    date
    description
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

export const PORTFOLIO_DETAIL_OTHER_PROJECT_FRAGMENT = gql`
  fragment PortfolioDetailOtherProject on OtherProject {
    name
    date
    description
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

export const PORTFOLIO_DETAIL_WOOD_WORK_FRAGMENT = gql`
  fragment PortfolioDetailWoodWork on WoodWork {
    name
    date
    description
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

interface PortfolioDetailParams {
  readonly project: PortfolioDetailOtherProjectFragment;
}

export const PortfolioDetail = ({ project }: PortfolioDetailParams) => {
  return (
    <div>
      <div className="landing-title-row">
        <h1 className="page-title">{project.name}</h1>
        <Link to="../projects">
          <button className="button-link">← PORTFOLIO</button>
        </Link>
      </div>
      <div className="portfolio-detail-media">
        <div className="portfolio-detail-media-carousel">
          <Carousel images={project.images} />
        </div>
      </div>
      <div>
        <p>{project.date}</p>
      </div>
      <p>{project.description}</p>
      <p>🚧 this part of the site under construction 🚧</p>
    </div>
  );
};

export default PortfolioDetail; // for dynamic import
