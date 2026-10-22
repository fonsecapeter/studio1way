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

// Icons load in capped batches as their items approach the viewport,
// so a tall screen can never queue the whole list at once.
const ICON_BATCH_SIZE = 8;

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

  const iconSrcFor = (project: PortfolioIndexProjectFragment) =>
    project.icon.animation?.half ?? project.icon.quarter;
  const projectsById = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    [projects],
  );

  const [loadedProjectIds, setLoadedProjectIds] = useState<Set<string>>(
    new Set(),
  );
  const loadedProjectIdsRef = useRef<Set<string>>(new Set());
  const queuedProjectIds = useRef<Set<string>>(new Set());
  const loadQueue = useRef<string[]>([]);
  const batchInFlight = useRef(false);
  const itemElements = useRef<Map<string, HTMLElement>>(new Map());
  const elementProjectIds = useRef<Map<HTMLElement, string>>(new Map());
  const itemRefCallbacks = useRef<
    Map<string, (el: HTMLElement | null) => void>
  >(new Map());
  const observer = useRef<IntersectionObserver | null>(null);
  const focusProjectRef = useRef<HTMLAnchorElement>(null);

  const pumpLoadQueueRef = useRef<() => void>(() => {});
  pumpLoadQueueRef.current = () => {
    if (batchInFlight.current) {
      return;
    }
    const batch = loadQueue.current.splice(0, ICON_BATCH_SIZE);
    if (batch.length === 0) {
      return;
    }
    batchInFlight.current = true;
    const images = batch
      .map((projectId) => projectsById.get(projectId))
      .filter((project) => project !== undefined)
      .map((project) => iconSrcFor(project));
    Promise.resolve(
      preloadImages({ images, setIsPreloaded: () => {}, delay: 0 }),
    )
      .catch(() => undefined)
      .finally(() => {
        batchInFlight.current = false;
        const nextLoaded = new Set(loadedProjectIdsRef.current);
        batch.forEach((projectId) => nextLoaded.add(projectId));
        loadedProjectIdsRef.current = nextLoaded;
        setLoadedProjectIds(nextLoaded);
        pumpLoadQueueRef.current();
      });
  };

  const pumpScheduled = useRef(false);
  const enqueueProject = (projectId: string) => {
    if (
      loadedProjectIdsRef.current.has(projectId) ||
      queuedProjectIds.current.has(projectId)
    ) {
      return;
    }
    queuedProjectIds.current.add(projectId);
    loadQueue.current.push(projectId);
    if (!pumpScheduled.current) {
      pumpScheduled.current = true;
      Promise.resolve().then(() => {
        pumpScheduled.current = false;
        pumpLoadQueueRef.current();
      });
    }
  };

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const projectId = elementProjectIds.current.get(
            entry.target as HTMLElement,
          );
          if (projectId) {
            observer.current?.unobserve(entry.target);
            enqueueProject(projectId);
          }
        });
      },
      { rootMargin: "800px 0px" },
    );
    itemElements.current.forEach((element) =>
      observer.current?.observe(element),
    );
    return () => observer.current?.disconnect();
  }, []);

  const registerItem = (project: PortfolioIndexProjectFragment) => {
    const existing = itemRefCallbacks.current.get(project.id);
    if (existing) {
      return existing;
    }
    const callback = (element: HTMLElement | null) => {
      if (project.id === focusProjectId) {
        focusProjectRef.current = element as HTMLAnchorElement | null;
      }
      if (element) {
        itemElements.current.set(project.id, element);
        elementProjectIds.current.set(element, project.id);
        if (observer.current) {
          observer.current.observe(element);
        } else if (typeof IntersectionObserver === "undefined") {
          enqueueProject(project.id);
        }
      } else {
        const previous = itemElements.current.get(project.id);
        if (previous) {
          elementProjectIds.current.delete(previous);
        }
        itemElements.current.delete(project.id);
      }
    };
    itemRefCallbacks.current.set(project.id, callback);
    return callback;
  };

  const focusProjectLoaded = loadedProjectIds.has(focusProjectId);
  useEffect(() => {
    if (focusProjectRef.current) {
      console.log("Scrolling to focus project");
      focusProjectRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [filteredProjects, focusProjectLoaded]);

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
        {filteredProjects.map((project) => (
          <PortfolioItem
            ref={registerItem(project)}
            project={project}
            key={project.name}
            iconPreloaded={loadedProjectIds.has(project.id)}
            selectedPortfolioDepartments={selectedCategoryString}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
