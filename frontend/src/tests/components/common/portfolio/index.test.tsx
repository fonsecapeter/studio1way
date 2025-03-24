import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Portfolio from "../../../../components/common/portfolio/index";
import { Route, Routes } from "react-router";
import Department from "../../../../components/common/department";

describe("Portfolio", () => {
  const PROJECTS = [
    {
      id: "a_test_project",
      name: "A Test Project",
      icon: {
        half: "test_img/50.png",
        alt: "fake image",
      },
    },
    {
      id: "another_test_project",
      name: "Another Test Project",
      icon: {
        half: "test_img/50.png",
        alt: "fake image",
      },
    },
  ];
  describe("when given a set of projects", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/something/projects"]}>
          <Routes>
            <Route path="/something" element={<Department />}>
              <Route
                path="projects"
                element={
                  <Portfolio title="Test Projects" projects={PROJECTS} />
                }
              />
            </Route>
          </Routes>
        </MemoryRouter>,
      );
    });

    it("renders the page title", () => {
      expect(screen.getByText("Test Projects")).toBeInTheDocument();
    });

    it("renders each project name", () => {
      expect(screen.getByText("A Test Project")).toBeInTheDocument();
      expect(screen.getByText("Another Test Project")).toBeInTheDocument();
    });

    it("renders each project icon", () => {
      expect(screen.getAllByAltText("fake image").length).toBe(2);
    });

    it("renders a button back to the category philosophy", () => {
      const linkElement = screen.getByRole("link", { name: "← PHILOSOPHY" });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.getAttribute("href")).toBe("/something");
    });
  });
});
