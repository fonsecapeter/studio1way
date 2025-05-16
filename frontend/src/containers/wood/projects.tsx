import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PORTFOLIO_INDEX_WOOD_WORK_FRAGMENT } from "../../components/common/portfolio/index";
import Portfolio from "../../components/common/portfolio/index";

export const WOOD_WORKS = gql`
  query woodWorks {
    woodWorks {
      ...PortfolioIndexWoodWork
    }
  }

  ${PORTFOLIO_INDEX_WOOD_WORK_FRAGMENT}
`;

export const WoodProjectsContainer = () => {
  const { loading, error, data } = useQuery(WOOD_WORKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <Portfolio title="Wood Works" projects={data.woodWorks} />;
};

export default WoodProjectsContainer;
