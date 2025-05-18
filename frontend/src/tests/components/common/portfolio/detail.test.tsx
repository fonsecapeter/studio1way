import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PortfolioDetail } from "../../../../components/common/portfolio/detail";
import { Department } from "../../../../components/common/department";

describe("PortfolioDetail", () => {
  const PROJECT = {
    name: "A Test Project",
  };
  describe("when given a valid project", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/something/project/a_test_project"]}>
          <Routes>
            <Route path="/something" element={<Department />}>
              <Route
                path="project/a_test_project"
                element={<PortfolioDetail project={PROJECT} />}
              />
            </Route>
          </Routes>
        </MemoryRouter>,
      );
    });

    it("renders the name", async () => {
      expect(screen.getByText("A Test Project")).toBeInTheDocument();
    });

    it("renders a button back to the category porfolio", () => {
      const linkElement = screen.getByRole("link", { name: "← PORTFOLIO" });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.getAttribute("href")).toBe("/something/projects");
    });
  });
});
