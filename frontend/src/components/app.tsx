import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query projects {
    projects {
      id
      name
      description
      links {
        url
        text
      }
      materials
      images {
          quarter
          alt
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  const projects = data.projects.map(({ id, name, description, links, materials, images }) => (
    <div key={id}>
      <h3>{name}</h3>
      <p>{description}</p>
      <ul>
        {links.map(({ url, text }) => (
          <li key={url}>
            <a href={url} target="_blank">
              {text}
            </a>
          </li>
        ))}
      </ul>
      {materials.map((material, idx) => (
          <p key={idx}>{material}</p>
      ))}
      {images.map((image, idx) => (
        <img key={idx} alt={image.alt} src={image.quarter} />
      ))}
    </div>
  ));
  return (
    <>
      <h1>WIP</h1>
      <p>this is a work in progress, here are some projects:</p>
      {projects}
    </>
  );
};

export default App;
export { App, GET_PROJECTS };
