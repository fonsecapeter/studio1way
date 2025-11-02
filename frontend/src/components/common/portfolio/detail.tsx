// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { PortfolioDetailOtherProjectFragment } from "../../../__generated__/types";
import Carousel from "../image/carousel";
import ImageModal from "../image/modal";

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
    }
  }
`;

interface PortfolioDetailParams {
  readonly project: PortfolioDetailOtherProjectFragment;
}

export const PortfolioDetail = ({ project }: PortfolioDetailParams) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let media;
  if (project.images.length > 1) {
    media = (
      <div className="portfolio-detail-media-img">
        <Carousel images={project.images} />
      </div>
    );
  } else {
    media = (
      <>
        <img
          data-testid="portfolio-detail-img"
          className="portfolio-detail-media-img"
          src={project.images[0].half}
          alt={project.images[0].alt}
          onClick={() => setIsModalOpen(true)}
        />
        <ImageModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          withTopGap={project.images[0].neverOverlap}
        >
          <img
            className="image-modal-full-size-image"
            src={project.images[0].full}
            alt={project.images[0].alt}
          />
        </ImageModal>
      </>
    );
  }
  return (
    <div>
      <div className="landing-title-row">
        <h1 className="page-title">{project.name}</h1>
        <Link to="../projects">
          <button className="button-link">← PORTFOLIO</button>
        </Link>
      </div>
      <div className="portfolio-detail-media">{media}</div>
      <div>
        <p>{project.date}</p>
      </div>
      <p>{project.description}</p>
      <p>🚧 this part of the site under construction 🚧</p>
    </div>
  );
};

export default PortfolioDetail; // for dynamic import
