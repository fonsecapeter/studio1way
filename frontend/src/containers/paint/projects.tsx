import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PROJECT_ITEM_FRAGMENT } from "../../components/portfolio/item";
import Portfolio from "../../components/portfolio/index";
import "../../assets/scss/paint.scss";

export const GET_PROJECTS = gql`
  query projects {
    projects {
      ...ProjectItem
    }
  }

  ${PROJECT_ITEM_FRAGMENT}
`;

export const PaintProjectsContainer = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <Portfolio title="WIP" projects={data.projects} data-testid="paint" />;
};

export default PaintProjectsContainer;
