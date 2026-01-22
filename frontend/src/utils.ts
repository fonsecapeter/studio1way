import {
  CeramicWare,
  Painting,
  WoodWork,
  ExperimentalProject,
} from "./__generated__/types";

class InvariantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvariantError";
  }
}

export const invariant = (expectation: boolean, msg: string) => {
  if (!expectation) {
    throw new InvariantError(msg);
  }
};

export const enum CATEGORY {
  CERAMIC_WARE = "CeramicWare",
  PAINTING = "Painting",
  WOOD_WORK = "WoodWork",
  EXPERIMENTAL_PROJECT = "ExperimentalProject",
}
export type CategoryType = `${CATEGORY}`;

export const enum DEPARTMENT {
  CERAMICS = "ceramics",
  PAINT = "paint",
  WOOD = "wood",
  EXPERIMENT = "experimental",
}
export type DepartmentType = `${DEPARTMENT}`;

type CategoryDepartmentMappingType = {
  toDepartment: { [key in CATEGORY]: DEPARTMENT };
  toCategory: { [key in DEPARTMENT]: CATEGORY };
};

export const CategoryDepartmentMapping: CategoryDepartmentMappingType = {
  toDepartment: {
    [CATEGORY.CERAMIC_WARE]: DEPARTMENT.CERAMICS,
    [CATEGORY.PAINTING]: DEPARTMENT.PAINT,
    [CATEGORY.WOOD_WORK]: DEPARTMENT.WOOD,
    [CATEGORY.EXPERIMENTAL_PROJECT]: DEPARTMENT.EXPERIMENT,
  },
  toCategory: {
    [DEPARTMENT.CERAMICS]: CATEGORY.CERAMIC_WARE,
    [DEPARTMENT.PAINT]: CATEGORY.PAINTING,
    [DEPARTMENT.WOOD]: CATEGORY.WOOD_WORK,
    [DEPARTMENT.EXPERIMENT]: CATEGORY.EXPERIMENTAL_PROJECT,
  },
};

export function isCeramicWare(obj: any): obj is CeramicWare {
  return obj.__typename === CATEGORY.CERAMIC_WARE;
}

export function isPainting(obj: any): obj is Painting {
  return obj.__typename === CATEGORY.PAINTING;
}

export function isWoodWork(obj: any): obj is WoodWork {
  return obj.__typename === CATEGORY.WOOD_WORK;
}

export function isExperimentalProject(obj: any): obj is ExperimentalProject {
  return obj.__typename === CATEGORY.EXPERIMENTAL_PROJECT;
}
