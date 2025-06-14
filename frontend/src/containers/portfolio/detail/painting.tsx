import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PORTFOLIO_DETAIL_PAINTING_FRAGMENT } from "../../../components/common/portfolio/detail";
import PortfolioDetail from "../../../components/common/portfolio/detail";

export const PAINTING_BY_ID = gql`
  query paintingById($projectId: ID!) {
    painting(id: $projectId) {
      ...PortfolioDetailPainting
    }
  }

  ${PORTFOLIO_DETAIL_PAINTING_FRAGMENT}
`;

type PaintingProjectDetailContainerParams = {
  projectId: string;
};

export const PaintingProjectDetailContainer = () => {
  const { projectId } = useParams<PaintingProjectDetailContainerParams>();
  const { loading, error, data } = useQuery(PAINTING_BY_ID, {
    variables: { projectId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <PortfolioDetail project={data.painting} />;
};

export default PaintingProjectDetailContainer;
