import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PORTFOLIO_INDEX_PAINTING_FRAGMENT } from "../../components/common/portfolio/index";
import Portfolio from "../../components/common/portfolio/index";

export const PAINTINGS = gql`
  query paintings {
    paintings {
      ...PortfolioIndexPainting
    }
  }

  ${PORTFOLIO_INDEX_PAINTING_FRAGMENT}
`;

export const PaintProjectsContainer = () => {
  const { loading, error, data } = useQuery(PAINTINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <Portfolio title="Paintings" projects={data.paintings} />;
};

export default PaintProjectsContainer;
