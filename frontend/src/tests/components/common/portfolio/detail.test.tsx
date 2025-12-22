import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PortfolioDetail } from "../../../../components/common/portfolio/detail";
import { Department } from "../../../../components/common/department";
import { PortfolioDetailOtherProjectFragment } from "../../../../__generated__/types";

describe("PortfolioDetail", () => {
  let project: PortfolioDetailOtherProjectFragment;
  describe("when given a project", () => {
    project = {
      name: "A Test Project",
      date: "2025-06-12",
      description: "For which to run tests against",
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
        <MemoryRouter initialEntries={["/something/project/a_test_project"]}>
          <Routes>
            <Route path="/something" element={<Department />}>
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
  });
});
