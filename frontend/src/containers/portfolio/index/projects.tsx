import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PORTFOLIO_INDEX_CERAMIC_WARE_FRAGMENT } from "../../../components/common/portfolio/index";
import { PORTFOLIO_INDEX_EXPERIMENTAL_PROJECT_FRAGMENT } from "../../../components/common/portfolio/index";
import { PORTFOLIO_INDEX_PAINTING_FRAGMENT } from "../../../components/common/portfolio/index";
import { PORTFOLIO_INDEX_WOOD_WORK_FRAGMENT } from "../../../components/common/portfolio/index";

import Portfolio from "../../../components/common/portfolio/index";

export const PROJECTS = gql`
  query allProjects {
    projects {
      __typename
      ...PortfolioIndexCeramicWare
      ...PortfolioIndexExperimentalProject
      ...PortfolioIndexPainting
      ...PortfolioIndexWoodWork
    }
  }

  ${PORTFOLIO_INDEX_CERAMIC_WARE_FRAGMENT}
  ${PORTFOLIO_INDEX_EXPERIMENTAL_PROJECT_FRAGMENT}
  ${PORTFOLIO_INDEX_PAINTING_FRAGMENT}
  ${PORTFOLIO_INDEX_WOOD_WORK_FRAGMENT}
`;

export const ProjectsPortfolioIndexContainer = () => {
  const { loading, error, data } = useQuery(PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <Portfolio title="Projects" projects={data.projects} />;
};

export default ProjectsPortfolioIndexContainer;
