import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PORTFOLIO_DETAIL_EXPERIMENTAL_PROJECT_FRAGMENT } from "../../../components/common/portfolio/detail";
import PortfolioDetail from "../../../components/common/portfolio/detail";

export const EXPERIMENTAL_PROJECT_BY_ID = gql`
  query experimentalProjectById($projectId: ID!) {
    experimentalProject(id: $projectId) {
      ...PortfolioDetailExperimentalProject
    }
  }

  ${PORTFOLIO_DETAIL_EXPERIMENTAL_PROJECT_FRAGMENT}
`;

type ExperimentalProjectDetailContainerParams = {
  projectId: string;
};

export const ExperimentalProjectDetailContainer = () => {
  const { projectId } = useParams<ExperimentalProjectDetailContainerParams>();
  const { loading, error, data } = useQuery(EXPERIMENTAL_PROJECT_BY_ID, {
    variables: { projectId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <PortfolioDetail project={data.experimentalProject} />;
};

export default ExperimentalProjectDetailContainer;
