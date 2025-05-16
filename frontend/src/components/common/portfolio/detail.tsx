// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react";
import { gql } from "@apollo/client";
// import { useNavigate } from 'react-router-dom';
// import Carousel from '../image/carousel';
// import ImageModal from '../image/modal';
// import NotFound from '../not_found';
import { PortfolioDetailOtherProjectFragment } from "../../../__generated__/types";

export const PORTFOLIO_DETAIL_CERAMIC_WARE_FRAGMENT = gql`
  fragment PortfolioDetailCeramicWare on CeramicWare {
    id
  }
`;

export const PORTFOLIO_DETAIL_OTHER_PROJECT_FRAGMENT = gql`
  fragment PortfolioDetailOtherProject on OtherProject {
    id
  }
`;

export const PORTFOLIO_DETAIL_PAINTING_FRAGMENT = gql`
  fragment PortfolioDetailPainting on Painting {
    id
  }
`;

export const PORTFOLIO_DETAIL_WOOD_WORK_FRAGMENT = gql`
  fragment PortfolioDetailWoodWork on WoodWork {
    id
  }
`;

interface PortfolioDetailParams {
  readonly project: PortfolioDetailOtherProjectFragment;
}

export const PortfolioDetail = ({ project }: PortfolioDetailParams) => {
  return <div>{project.id}</div>;
};

export default PortfolioDetail; // for dynamic import
