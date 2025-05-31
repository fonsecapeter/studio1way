import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PORTFOLIO_INDEX_OTHER_PROJECT_FRAGMENT } from "../../../components/common/portfolio/index";
import Portfolio from "../../../components/common/portfolio/index";

export const OTHER_PROJECTS = gql`
  query otherProjects {
    otherProjects {
      ...PortfolioIndexOtherProject
    }
  }

  ${PORTFOLIO_INDEX_OTHER_PROJECT_FRAGMENT}
`;

export const OtherPortfolioIndexContainer = () => {
  const { loading, error, data } = useQuery(OTHER_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <Portfolio title="Other Projects" projects={data.otherProjects} />;
};

export default OtherPortfolioIndexContainer;
