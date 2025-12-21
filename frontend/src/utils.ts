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
  OTHER = "OtherProject",
}
export type CategoryType = `${CATEGORY}`;

export const enum DEPARTMENT {
  CERAMICS = "ceramics",
  PAINT = "paint",
  WOOD = "wood",
  OTHER = "other",
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
    [CATEGORY.OTHER]: DEPARTMENT.OTHER,
  },
  toCategory: {
    [DEPARTMENT.CERAMICS]: CATEGORY.CERAMIC_WARE,
    [DEPARTMENT.PAINT]: CATEGORY.PAINTING,
    [DEPARTMENT.WOOD]: CATEGORY.WOOD_WORK,
    [DEPARTMENT.OTHER]: CATEGORY.OTHER,
  },
};
