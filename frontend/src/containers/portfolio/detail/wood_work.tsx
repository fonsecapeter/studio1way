import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PORTFOLIO_DETAIL_WOOD_WORK_FRAGMENT } from "../../../components/common/portfolio/detail";
import PortfolioDetail from "../../../components/common/portfolio/detail";

export const WOOD_WORK_BY_ID = gql`
  query woodWorkById($projectId: ID!) {
    woodWork(id: $projectId) {
      ...PortfolioDetailWoodWork
    }
  }

  ${PORTFOLIO_DETAIL_WOOD_WORK_FRAGMENT}
`;

type WoodWorkProjectDetailContainerParams = {
  projectId: string;
};

export const WoodWorkProjectDetailContainer = () => {
  const { projectId } = useParams<WoodWorkProjectDetailContainerParams>();
  const { loading, error, data } = useQuery(WOOD_WORK_BY_ID, {
    variables: { projectId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <PortfolioDetail project={data.woodWork} />;
};

export default WoodWorkProjectDetailContainer;
