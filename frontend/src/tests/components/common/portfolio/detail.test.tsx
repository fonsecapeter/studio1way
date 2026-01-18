import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PortfolioDetail } from "../../../../components/common/portfolio/detail";
import { Department } from "../../../../components/common/department";
import {
  PortfolioDetailCeramicWareFragment,
  PortfolioDetailOtherProjectFragment,
  PortfolioDetailPaintingFragment,
  PortfolioDetailWoodWorkFragment,
} from "../../../../__generated__/types";

jest.mock("../../../../components/common/image/preload", () => ({
  ...jest.requireActual("../../../../components/common/image/preload"),
  __esModule: true,
  default: jest.fn((args) => {
    args.setIsPreloaded(true);
  }),
}));

describe("PortfolioDetail", () => {
  describe("when given a project", () => {
    let project: PortfolioDetailOtherProjectFragment = {
      __typename: "OtherProject",
      name: "A Test Project",
      date: "2025-06-12",
      description: "For which to run tests against",
      links: [
        { url: "http://example.com", text: "Example Link" },
        { url: "http://anotherexample.com", text: "Example SecondLink" },
      ],
      images: [
        {
          full: "test-100",
          half: "test-50",
          quarter: "test-25",
          alt: "test-alt",
          neverOverlap: false,
          animation: null,
        },
      ],
    };

    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/other/project/a_test_project"]}>
          <Routes>
            <Route path="/other" element={<Department />}>
              <Route
                path="project/a_test_project"
                element={<PortfolioDetail project={project} />}
              />
            </Route>
          </Routes>
        </MemoryRouter>,
      );
    });

    it("renders the base project text fields", async () => {
      expect(screen.getByText("A Test Project")).toBeInTheDocument();
      expect(
        screen.getByText("For which to run tests against"),
      ).toBeInTheDocument();
      expect(screen.getByText("2025-06-12")).toBeInTheDocument();
    });

    it("renders a button back to the category porfolio", () => {
      const linkElement = screen.getByRole("link", { name: "← PORTFOLIO" });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.getAttribute("href")).toBe("/portfolio");
    });

    it("renders a carousel", () => {
      const mainImageElement = screen.getByTestId("carousel-main-image");
      expect(mainImageElement).toHaveAttribute("src", "test-50");
    });

    it("renders links", () => {
      const linkElement = screen.getByRole("link", { name: "Example Link" });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", "http://example.com");
      const secondLinkElement = screen.getByRole("link", {
        name: "Example SecondLink",
      });
      expect(secondLinkElement).toBeInTheDocument();
      expect(secondLinkElement).toHaveAttribute(
        "href",
        "http://anotherexample.com",
      );
    });
  });

  describe("when given a CeramicWare", () => {
    let project: PortfolioDetailCeramicWareFragment = {
      __typename: "CeramicWare",
      name: "A Test Cup",
      date: "2025-06-12",
      description: "For which to run tests against",
      links: [],
      images: [
        {
          full: "test-100",
          half: "test-50",
          quarter: "test-25",
          alt: "test-alt",
          neverOverlap: false,
          animation: null,
        },
      ],
      clayBody: "gray stoneware",
      glaze: "clear",
    };

    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/ceramics/project/a_test_project"]}>
          <Routes>
            <Route path="/ceramics" element={<Department />}>
              <Route
                path="project/a_test_project"
                element={<PortfolioDetail project={project} />}
              />
            </Route>
          </Routes>
        </MemoryRouter>,
      );
    });

    it("renders ceramic properties", async () => {
      expect(
        screen.getByText("gray stoneware with clear glaze"),
      ).toBeInTheDocument();
    });
  });

  describe("when given an unvarnished Painting", () => {
    let project: PortfolioDetailPaintingFragment = {
      __typename: "Painting",
      name: "A Test Painting",
      date: "2025-06-12",
      description: "For which to run tests against",
      links: [],
      images: [
        {
          full: "test-100",
          half: "test-50",
          quarter: "test-25",
          alt: "test-alt",
          neverOverlap: false,
          animation: null,
        },
      ],
      medium: "oil",
      surface: "canvas",
      varnished: false,
    };

    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/ceramics/project/a_test_project"]}>
          <Routes>
            <Route path="/ceramics" element={<Department />}>
              <Route
                path="project/a_test_project"
                element={<PortfolioDetail project={project} />}
              />
            </Route>
          </Routes>
        </MemoryRouter>,
      );
    });

    it("renders unvarnished paint properties", async () => {
      expect(screen.getByText("oil on canvas")).toBeInTheDocument();
    });
  });

  describe("when given a varnished Painting", () => {
    let project: PortfolioDetailPaintingFragment = {
      __typename: "Painting",
      name: "A Test Painting",
      date: "2025-06-12",
      description: "For which to run tests against",
      links: [],
      images: [
        {
          full: "test-100",
          half: "test-50",
          quarter: "test-25",
          alt: "test-alt",
          neverOverlap: false,
          animation: null,
        },
      ],
      medium: "acrylic",
      surface: "canvas",
      varnished: true,
    };

    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/ceramics/project/a_test_project"]}>
          <Routes>
            <Route path="/ceramics" element={<Department />}>
              <Route
                path="project/a_test_project"
                element={<PortfolioDetail project={project} />}
              />
            </Route>
          </Routes>
        </MemoryRouter>,
      );
    });

    it("renders varnished paint properties", async () => {
      expect(
        screen.getByText("acrylic on canvas (varnished)"),
      ).toBeInTheDocument();
    });
  });

  describe("when given a WoodWork", () => {
    let project: PortfolioDetailWoodWorkFragment = {
      __typename: "WoodWork",
      name: "A Test Table",
      date: "2025-06-12",
      description: "For which to run tests against",
      links: [],
      images: [
        {
          full: "test-100",
          half: "test-50",
          quarter: "test-25",
          alt: "test-alt",
          neverOverlap: false,
          animation: null,
        },
      ],
      materials: "7-ply ac fir",
      finish: "linseed oil + beeswax",
    };

    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/ceramics/project/a_test_project"]}>
          <Routes>
            <Route path="/ceramics" element={<Department />}>
              <Route
                path="project/a_test_project"
                element={<PortfolioDetail project={project} />}
              />
            </Route>
          </Routes>
        </MemoryRouter>,
      );
    });

    it("renders varnished paint properties", async () => {
      expect(
        screen.getByText("linseed oil + beeswax on 7-ply ac fir"),
      ).toBeInTheDocument();
    });
  });
});
