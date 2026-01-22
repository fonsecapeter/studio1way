import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PORTFOLIO_DETAIL_CERAMIC_WARE_FRAGMENT } from "../../../components/common/portfolio/detail";
import PortfolioDetail from "../../../components/common/portfolio/detail";
import { DEPARTMENT } from "../../../utils";

export const CERAMIC_WARE_BY_ID = gql`
  query ceramicWareById($projectId: ID!) {
    ceramicWare(id: $projectId) {
      ...PortfolioDetailCeramicWare
    }
  }

  ${PORTFOLIO_DETAIL_CERAMIC_WARE_FRAGMENT}
`;

type CeramicWareProjectDetailContainerParams = {
  projectId: string;
};

export const CeramicWareProjectDetailContainer = () => {
  const { projectId } = useParams<CeramicWareProjectDetailContainerParams>();
  const { loading, error, data } = useQuery(CERAMIC_WARE_BY_ID, {
    variables: { projectId },
  });
  const [searchParams] = useSearchParams();
  const selectedPortfolioDepartments =
    searchParams.get("dept") ?? DEPARTMENT.CERAMICS;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return (
    <PortfolioDetail
      project={data.ceramicWare}
      selectedPortfolioDepartments={selectedPortfolioDepartments}
    />
  );
};

export default CeramicWareProjectDetailContainer;
