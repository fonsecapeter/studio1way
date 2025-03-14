import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { WOOD_WORK_ITEM_FRAGMENT } from "../../components/portfolio/item";
import Portfolio from "../../components/portfolio/index";
import "../../assets/scss/wood.scss";

export const WOOD_WORKS = gql`
  query woodWorks {
    woodWorks {
      ...WoodWorkItem
    }
  }

  ${WOOD_WORK_ITEM_FRAGMENT}
`;

export const WoodProjectsContainer = () => {
  const { loading, error, data } = useQuery(WOOD_WORKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <Portfolio title="Wood" projects={data.woodWorks} />;
};

export default WoodProjectsContainer;
