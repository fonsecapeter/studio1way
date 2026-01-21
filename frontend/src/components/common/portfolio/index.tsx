// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useMemo, useEffect } from "react";
import { gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { PortfolioItem } from "./item";
import {
  PortfolioIndexOtherProjectFragment,
  PortfolioIndexPaintingFragment,
  PortfolioIndexCeramicWareFragment,
  PortfolioIndexWoodWorkFragment,
} from "../../../__generated__/types";
import {
  PORTFOLIO_ITEM_CERAMIC_WARE_FRAGMENT,
  PORTFOLIO_ITEM_OTHER_PROJECT_FRAGMENT,
  PORTFOLIO_ITEM_PAINTING_FRAGMENT,
  PORTFOLIO_ITEM_WOOD_WORK_FRAGMENT,
} from "./item";
import {
  CATEGORY,
  CategoryType,
  CategoryDepartmentMapping,
  DepartmentType,
} from "../../../utils";
import preloadImages from "../image/preload";
import { FilterDropdown } from "../filter_dropdown";

export type PortfolioIndexProjectFragment =
  | PortfolioIndexOtherProjectFragment
  | PortfolioIndexPaintingFragment
  | PortfolioIndexCeramicWareFragment
  | PortfolioIndexWoodWorkFragment;

export const PORTFOLIO_INDEX_CERAMIC_WARE_FRAGMENT = gql`
  fragment PortfolioIndexCeramicWare on CeramicWare {
    id
    ...PortfolioItemCeramicWare
  }

  ${PORTFOLIO_ITEM_CERAMIC_WARE_FRAGMENT}
`;

export const PORTFOLIO_INDEX_OTHER_PROJECT_FRAGMENT = gql`
  fragment PortfolioIndexOtherProject on OtherProject {
    id
    ...PortfolioItemOtherProject
  }

  ${PORTFOLIO_ITEM_OTHER_PROJECT_FRAGMENT}
`;

export const PORTFOLIO_INDEX_PAINTING_FRAGMENT = gql`
  fragment PortfolioIndexPainting on Painting {
    id
    ...PortfolioItemPainting
  }

  ${PORTFOLIO_ITEM_PAINTING_FRAGMENT}
`;

export const PORTFOLIO_INDEX_WOOD_WORK_FRAGMENT = gql`
  fragment PortfolioIndexWoodWork on WoodWork {
    id
    ...PortfolioItemWoodWork
  }

  ${PORTFOLIO_ITEM_WOOD_WORK_FRAGMENT}
`;

interface PreloadGroup {
  images: string[];
  setIsPreloaded: CallableFunction;
  delay: number;
}

interface PortfolioProps {
  readonly title: string;
  readonly projects: PortfolioIndexProjectFragment[];
}

export const Portfolio = ({ title, projects }: PortfolioProps) => {
  const [searchParams] = useSearchParams();
  const initialDept = searchParams.get("dept") ?? "";
  const initialSelectedCategories: Set<CategoryType> = new Set();
  if (initialDept in CategoryDepartmentMapping.toCategory) {
    initialSelectedCategories.add(
      CategoryDepartmentMapping.toCategory[initialDept as DepartmentType],
    );
  }
  const [selectedCategories, setSelectedCategories] = useState<
    Set<CategoryType>
  >(initialSelectedCategories);

  const filteredProjects = useMemo(() => {
    if (selectedCategories.size === 0) {
      return projects;
    }
    return projects.filter((project) => {
      const projectType = project.__typename ?? CATEGORY.OTHER;
      return selectedCategories.has(projectType);
    });
  }, [selectedCategories]);

  const preloadGroups: PreloadGroup[] = [];
  let preloadGroupCount = 2;
  if (projects.length > 32) {
    preloadGroupCount = 5;
  }
  const [areGroupsPreloaded, setAreGroupsPreloaded] = useState(
    Array(preloadGroupCount).fill(false),
  );
  const setIsGroupPreloaded = (groupIdx: number) => {
    return (isGroupPreloaded: boolean) =>
      setAreGroupsPreloaded((prevAreGroupsPreloaded) => {
        const newAreGroupsPreloaded = [...prevAreGroupsPreloaded];
        newAreGroupsPreloaded[groupIdx] = isGroupPreloaded;
        return newAreGroupsPreloaded;
      });
  };
  for (let groupIdx = 0; groupIdx < preloadGroupCount; groupIdx++) {
    preloadGroups.push({
      images: [],
      setIsPreloaded: setIsGroupPreloaded(groupIdx),
      delay: groupIdx * 1000 + 500,
    });
  }
  const groupId = (idx: number) =>
    Math.floor(idx / Math.ceil(projects.length / preloadGroupCount));
  projects.forEach((project, idx) => {
    const iconSrc = project.icon.animation?.half ?? project.icon.half;
    preloadGroups[groupId(idx)].images.push(iconSrc);
  });
  useEffect(() => {
    preloadGroups.forEach((group) => {
      preloadImages({
        images: group.images,
        setIsPreloaded: group.setIsPreloaded,
        delay: group.delay,
      });
    });
  }, []);

  return (
    <div>
      <div className="landing-title-row">
        <h1 className="page-title">{title}</h1>
        <FilterDropdown
          name="DEPARTMENT"
          options={CategoryDepartmentMapping.toDepartment}
          selectedOptions={selectedCategories}
          onChange={setSelectedCategories}
        />
      </div>
      <div className="portfolio-list">
        <div className="portfolio-column">
          {filteredProjects.map((project, idx) => (
            <PortfolioItem
              project={project}
              key={project.name}
              iconPreloaded={areGroupsPreloaded[groupId(idx)]}
            />
          ))}
        </div>
        <div className="portfolio-column-desktop">
          {filteredProjects.map((project, idx) => {
            if (idx % 2 === 0) {
              return (
                <PortfolioItem
                  project={project}
                  key={project.name}
                  iconPreloaded={areGroupsPreloaded[groupId(idx)]}
                />
              );
            }
            return "";
          })}
        </div>
        <div className="portfolio-column-desktop">
          {filteredProjects.map((project, idx) => {
            if (idx % 2 !== 0) {
              return (
                <PortfolioItem
                  project={project}
                  key={project.name}
                  iconPreloaded={areGroupsPreloaded[groupId(idx)]}
                />
              );
            }
            return "";
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
