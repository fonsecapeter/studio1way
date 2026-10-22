import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioItem from "../../../../components/common/portfolio/item";

describe("PortfolioItem", () => {
  describe("with a static icon ExperimentalProject", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <PortfolioItem
            project={{
              __typename: "ExperimentalProject",
              id: "a_test_project",
              name: "A Test Project",
              icon: {
                quarter: "test_img/25.png",
                width: 1000,
                height: 750,
                alt: "fake image",
                animation: null,
              },
            }}
            iconPreloaded={true}
            selectedPortfolioDepartments=""
          />
        </MemoryRouter>,
      );
    });

    it("renders the project name", () => {
      expect(screen.getByText("A Test Project")).toBeInTheDocument();
    });

    it("renders the icon", () => {
      const iconElement = screen.getByAltText("fake image");
      expect(iconElement).toHaveAttribute("src", "test_img/25.png");
    });

    it("links to the experiment detail page", () => {
      expect(screen.getByTestId("portfolio-item-link")).toHaveAttribute(
        "href",
        "/experimental/project/a_test_project",
      );
    });
  });

  describe("with selectedPortfolioDepartments", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <PortfolioItem
            project={{
              __typename: "ExperimentalProject",
              id: "a_test_project",
              name: "A Test Project",
              icon: {
                quarter: "test_img/25.png",
                width: 1000,
                height: 750,
                alt: "fake image",
                animation: null,
              },
            }}
            iconPreloaded={true}
            selectedPortfolioDepartments="ceramics,paint"
          />
        </MemoryRouter>,
      );
    });

    it("forwards in the link to the experiment detail page", () => {
      expect(screen.getByTestId("portfolio-item-link")).toHaveAttribute(
        "href",
        "/experimental/project/a_test_project?dept=ceramics,paint",
      );
    });
  });

  describe("with an animated icon CeramicWare", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <PortfolioItem
            project={{
              __typename: "CeramicWare",
              id: "a_test_cup",
              name: "A Test Cup",
              icon: {
                quarter: "test_cup_img/25.png",
                width: 1000,
                height: 750,
                alt: "fake cup image",
                animation: {
                  half: "test_cup_img/animation/50.gif",
                },
              },
            }}
            iconPreloaded={true}
            selectedPortfolioDepartments=""
          />
        </MemoryRouter>,
      );
    });

    it("renders the icon animation", () => {
      const iconElement = screen.getByAltText("fake cup image");
      expect(iconElement).toHaveAttribute(
        "src",
        "test_cup_img/animation/50.gif",
      );
    });

    it("links to the ceramics detail page", () => {
      expect(screen.getByTestId("portfolio-item-link")).toHaveAttribute(
        "href",
        "/ceramics/project/a_test_cup",
      );
    });
  });

  describe("with a Painting", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <PortfolioItem
            project={{
              __typename: "Painting",
              id: "a_test_painting",
              name: "A Test Painting",
              icon: {
                quarter: "test_painting/25.png",
                width: 1000,
                height: 750,
                alt: "fake painting",
                animation: null,
              },
            }}
            iconPreloaded={true}
            selectedPortfolioDepartments=""
          />
        </MemoryRouter>,
      );
    });

    it("links to the paint detail page", () => {
      expect(screen.getByTestId("portfolio-item-link")).toHaveAttribute(
        "href",
        "/paint/project/a_test_painting",
      );
    });
  });

  describe("with a WoodWork that isnt yet preloaded", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <PortfolioItem
            project={{
              __typename: "WoodWork",
              id: "a_test_table",
              name: "A Test Table",
              icon: {
                quarter: "test_table/25.png",
                width: 1000,
                height: 750,
                alt: "fake table image",
                animation: null,
              },
            }}
            iconPreloaded={true}
            selectedPortfolioDepartments=""
          />
        </MemoryRouter>,
      );
    });

    it("links to the wood detail page", () => {
      expect(screen.getByTestId("portfolio-item-link")).toHaveAttribute(
        "href",
        "/wood/project/a_test_table",
      );
    });

    it("renders an image placeholder instead of an icon", () => {
      expect(screen.queryByAltText("fake image")).not.toBeInTheDocument();
    });
  });
});
