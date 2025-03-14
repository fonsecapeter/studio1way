import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { CERAMIC_WARE_ITEM_FRAGMENT } from "../../components/portfolio/item";
import Portfolio from "../../components/portfolio/index";
import "../../assets/scss/ceramics.scss";

export const CERAMIC_WARES = gql`
  query ceramicWares {
    ceramicWares {
      ...CeramicWareItem
    }
  }

  ${CERAMIC_WARE_ITEM_FRAGMENT}
`;

export const CeramicsProjectsContainer = () => {
  const { loading, error, data } = useQuery(CERAMIC_WARES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  return <Portfolio title="Ceramics" projects={data.ceramicWares} />;
};

export default CeramicsProjectsContainer;
