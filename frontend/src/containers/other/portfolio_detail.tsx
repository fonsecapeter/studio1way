import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PORTFOLIO_DETAIL_OTHER_PROJECT_FRAGMENT } from "../../components/common/portfolio/detail";
import PortfolioDetail from "../../components/common/portfolio/detail";

export const OTHER_PROJECT_BY_ID = gql`
  query otherProjectById($projectId: ID!) {
    otherProject(id: $projectId) {
      ...PortfolioDetailOtherProject
    }
  }

  ${PORTFOLIO_DETAIL_OTHER_PROJECT_FRAGMENT}
`;

type PortfolioDetailContainerParams = {
  projectId: string,
};

export const CeramicsProjectsContainer = () => {
  const { projectId } = useParams<PortfolioDetailContainerParams>();
  const { loading, error, data } = useQuery(OTHER_PROJECT_BY_ID, { variables: { projectId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <PortfolioDetail project={data.otherProject} />;
};

export default CeramicsProjectsContainer;
