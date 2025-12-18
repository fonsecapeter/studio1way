import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioItem from "../../../../components/common/portfolio/item";

describe("PortfolioItem", () => {
  describe("with a static icon", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <PortfolioItem
            project={{
              id: "a_test_project",
              name: "A Test Project",
              icon: {
                half: "test_img/50.png",
                alt: "fake image",
                animation: null,
              },
            }}
          />
        </MemoryRouter>,
      );
    });

    it("renders the project name", () => {
      expect(screen.getByText("A Test Project")).toBeInTheDocument();
    });

    it("renders the icon", () => {
      const iconElement = screen.getByAltText("fake image");
      expect(iconElement).toHaveAttribute("src", "test_img/50.png");
    });
  });

  describe("with an animated icon", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <PortfolioItem
            project={{
              id: "a_test_project",
              name: "A Test Project",
              icon: {
                half: "test_img/50.png",
                alt: "fake image",
                animation: {
                  half: "test_img/animation/50.gif",
                },
              },
            }}
          />
        </MemoryRouter>,
      );
    });

    it("renders the project name", () => {
      expect(screen.getByText("A Test Project")).toBeInTheDocument();
    });

    it("renders the icon animation", () => {
      const iconElement = screen.getByAltText("fake image");
      expect(iconElement).toHaveAttribute("src", "test_img/animation/50.gif");
    });
  });
});
