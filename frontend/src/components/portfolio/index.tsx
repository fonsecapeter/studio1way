// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { PortfolioItem } from "./item";
import { ProjectItemFragment } from "../../__generated__/types";

interface PortfolioProps {
  readonly title: string;
  readonly projects: ProjectItemFragment[];
}

export const Portfolio = ({ title, projects }: PortfolioProps) => (
  <div>
    <h1 className="page-title">{title}</h1>
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
