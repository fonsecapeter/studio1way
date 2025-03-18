// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { PortfolioItem } from "./item";
import { OtherProjectItemFragment } from "../../__generated__/types";

interface PortfolioProps {
  readonly title: string;
  readonly projects: OtherProjectItemFragment[];
}

export const Portfolio = ({ title, projects }: PortfolioProps) => (
  <div>
    <div className="landing-title-row">
      <h1 className="page-title">{title}</h1>
      <Link to="..">
        <button className="button-link">← PHILOSOPHY</button>
      </Link>
    </div>
    <div className="portfolio-list">
      <div className="portfolio-column">
        {projects.map((project) => (
          <PortfolioItem project={project} key={project.name} />
        ))}
      </div>
    </div>
  </div>
);

export default Portfolio;
