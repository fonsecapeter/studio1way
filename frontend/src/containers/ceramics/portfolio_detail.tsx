import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PORTFOLIO_DETAIL_CERAMIC_WARE_FRAGMENT } from "../../components/common/portfolio/detail";
import PortfolioDetail from "../../components/common/portfolio/detail";

export const CERAMIC_WARE_BY_ID = gql`
  query ceramicWareById($projectId: ID!) {
    ceramicWare(id: $projectId) {
      ...PortfolioDetailCeramicWare
    }
  }

  ${PORTFOLIO_DETAIL_CERAMIC_WARE_FRAGMENT}
`;

type PortfolioDetailContainerParams = {
  projectId: string,
};

export const CeramicsProjectsContainer = () => {
  const { projectId } = useParams<PortfolioDetailContainerParams>();
  const { loading, error, data } = useQuery(CERAMIC_WARE_BY_ID, { variables: { projectId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <PortfolioDetail project={data.ceramicWare} />;
};

export default CeramicsProjectsContainer;
