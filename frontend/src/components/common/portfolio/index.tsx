// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { PortfolioItem } from "./item";
import {
  PortfolioIndexOtherProjectFragment,
  PortfolioIndexPaintingFragment,
  PortfolioIndexCeramicWareFragment,
  PortfolioIndexWoodWorkFragment,
} from "../../../__generated__/types";
import {
  PORTFOLIO_ITEM_CERAMIC_WARE_FRAGMENT,
  PORTFOLIO_ITEM_OTHER_PROJECT_FRAGMENT,
  PORTFOLIO_ITEM_PAINTING_FRAGMENT,
  PORTFOLIO_ITEM_WOOD_WORK_FRAGMENT,
} from "./item";

export type PortfolioIndexProjectFragment =
  | PortfolioIndexOtherProjectFragment
  | PortfolioIndexPaintingFragment
  | PortfolioIndexCeramicWareFragment
  | PortfolioIndexWoodWorkFragment;

export const PORTFOLIO_INDEX_CERAMIC_WARE_FRAGMENT = gql`
  fragment PortfolioIndexCeramicWare on CeramicWare {
    id
    ...PortfolioItemCeramicWare
  }

  ${PORTFOLIO_ITEM_CERAMIC_WARE_FRAGMENT}
`;

export const PORTFOLIO_INDEX_OTHER_PROJECT_FRAGMENT = gql`
  fragment PortfolioIndexOtherProject on OtherProject {
    id
    ...PortfolioItemOtherProject
  }

  ${PORTFOLIO_ITEM_OTHER_PROJECT_FRAGMENT}
`;

export const PORTFOLIO_INDEX_PAINTING_FRAGMENT = gql`
  fragment PortfolioIndexPainting on Painting {
    id
    ...PortfolioItemPainting
  }

  ${PORTFOLIO_ITEM_PAINTING_FRAGMENT}
`;

export const PORTFOLIO_INDEX_WOOD_WORK_FRAGMENT = gql`
  fragment PortfolioIndexWoodWork on WoodWork {
    id
    ...PortfolioItemWoodWork
  }

  ${PORTFOLIO_ITEM_WOOD_WORK_FRAGMENT}
`;

interface PortfolioProps {
  readonly title: string;
  readonly projects: PortfolioIndexProjectFragment[];
}

export const Portfolio = ({ title, projects }: PortfolioProps) => (
  <div>
    <div className="landing-title-row">
      <h1 className="page-title">{title}</h1>
      <Link to="..">
        <button className="button-link">← PHILOSOPHY</button>
      </Link>
    </div>
    <div className="portfolio-list">
      <div className="portfolio-column">
        {projects.map((project) => (
          <PortfolioItem project={project} key={project.name} />
        ))}
      </div>
    </div>
  </div>
);

export default Portfolio;
