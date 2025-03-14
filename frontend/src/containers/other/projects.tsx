import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { OTHER_PROJECT_ITEM_FRAGMENT } from "../../components/portfolio/item";
import Portfolio from "../../components/portfolio/index";
import "../../assets/scss/other.scss";

export const OTHER_PROJECTS = gql`
  query otherProjects {
    otherProjects {
      ...OtherProjectItem
    }
  }

  ${OTHER_PROJECT_ITEM_FRAGMENT}
`;

export const OtherProjectsContainer = () => {
  const { loading, error, data } = useQuery(OTHER_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <Portfolio title="Other Projects" projects={data.otherProjects} />;
};

export default OtherProjectsContainer;
