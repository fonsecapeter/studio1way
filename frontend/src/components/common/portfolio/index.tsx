// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useMemo, useEffect, useRef } from "react";
import { gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { PortfolioItem } from "./item";
import {
  PortfolioIndexExperimentalProjectFragment,
  PortfolioIndexPaintingFragment,
  PortfolioIndexCeramicWareFragment,
  PortfolioIndexWoodWorkFragment,
} from "../../../__generated__/types";
import {
  PORTFOLIO_ITEM_CERAMIC_WARE_FRAGMENT,
  PORTFOLIO_ITEM_EXPERIMENTAL_PROJECT_FRAGMENT,
  PORTFOLIO_ITEM_PAINTING_FRAGMENT,
  PORTFOLIO_ITEM_WOOD_WORK_FRAGMENT,
} from "./item";
import {
  CATEGORY,
  CategoryType,
  CategoryDepartmentMapping,
  DepartmentType,
  DEPARTMENT,
} from "../../../utils";
import preloadImages from "../image/preload";
import { FilterDropdown } from "../filter_dropdown";

export type PortfolioIndexProjectFragment =
  | PortfolioIndexExperimentalProjectFragment
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

export const PORTFOLIO_INDEX_EXPERIMENTAL_PROJECT_FRAGMENT = gql`
  fragment PortfolioIndexExperimentalProject on ExperimentalProject {
    id
    ...PortfolioItemExperimentalProject
  }

  ${PORTFOLIO_ITEM_EXPERIMENTAL_PROJECT_FRAGMENT}
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
  const initialDeptString = searchParams.get("dept") ?? "";
  const focusProjectId = searchParams.get("focus") ?? "";
  const initialSelectedCategories: Set<CategoryType> = new Set();
  const intitialDepts = initialDeptString.split(",");
  intitialDepts.forEach((dept) => {
    if (dept in CategoryDepartmentMapping.toCategory) {
      initialSelectedCategories.add(
        CategoryDepartmentMapping.toCategory[dept as DepartmentType],
      );
    }
  });
  const [selectedCategories, setSelectedCategories] = useState<
    Set<CategoryType>
  >(initialSelectedCategories);
  let selectedCategoryString = "";
  if (selectedCategories.size) {
    selectedCategoryString = Array.from(selectedCategories)
      .map((category) => CategoryDepartmentMapping.toDepartment[category])
      .join(",");
  } else {
    selectedCategoryString = `${DEPARTMENT.CERAMICS},${DEPARTMENT.EXPERIMENT},${DEPARTMENT.PAINT},${DEPARTMENT.WOOD}`;
  }

  const filteredProjects = useMemo(() => {
    if (selectedCategories.size === 0) {
      return projects;
    }
    return projects.filter((project) => {
      const projectType = project.__typename ?? CATEGORY.EXPERIMENTAL_PROJECT;
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
      delay: 0, // manually test with groupIdx * 1000 + 500
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

  const focusProjectRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (focusProjectRef.current) {
      console.log("Scrolling to focus project");
      focusProjectRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [areGroupsPreloaded]);

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
        {filteredProjects.map((project, idx) => (
          <PortfolioItem
            {...(project.id === focusProjectId ? { ref: focusProjectRef } : {})}
            project={project}
            key={project.name}
            iconPreloaded={areGroupsPreloaded[groupId(idx)]}
            selectedPortfolioDepartments={selectedCategoryString}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
