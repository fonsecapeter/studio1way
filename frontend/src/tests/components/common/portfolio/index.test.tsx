import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Portfolio from "../../../../components/common/portfolio/index";
import { Route, Routes } from "react-router";
import Department from "../../../../components/common/department";
import { CATEGORY } from "../../../../utils";

describe("Portfolio", () => {
  const PROJECTS = [
    {
      __typename: CATEGORY.EXPERIMENTAL_PROJECT,
      id: "a_test_project",
      name: "A Test Project",
      icon: {
        half: "test_img/50.png",
        alt: "fake image",
        animation: null,
      },
    },
    {
      __typename: CATEGORY.PAINTING,
      id: "a_test_painting",
      name: "A Test Painting",
      icon: {
        half: "test_img/50.png",
        alt: "fake image",
        animation: null,
      },
    },
    {
      __typename: CATEGORY.CERAMIC_WARE,
      id: "a_test_cup",
      name: "A Test Cup",
      icon: {
        half: "test_img/50.png",
        alt: "fake image",
        animation: null,
      },
    },
    {
      __typename: CATEGORY.WOOD_WORK,
      id: "a_test_table",
      name: "A Test Table",
      icon: {
        half: "test_img/50.png",
        alt: "fake image",
        animation: null,
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

    it("renders each project item, one for mobile, one for desktop", () => {
      expect(screen.queryAllByText("A Test Project").length).toBe(2);
      expect(screen.queryAllByText("A Test Painting").length).toBe(2);
      expect(screen.queryAllByText("A Test Cup").length).toBe(2);
      expect(screen.queryAllByText("A Test Table").length).toBe(2);
    });

    describe("the department filter", () => {
      it("exists", () => {
        expect(screen.getByText("DEPARTMENT ↓"));
      });

      it("filters projects", async () => {
        const filterButton = screen.getByText("DEPARTMENT ↓");
        await fireEvent.click(filterButton);
        const ceramicsSelector = screen.getByText("ceramics");
        await fireEvent.click(ceramicsSelector);
        expect(screen.queryAllByText("A Test Project").length).toBe(0);
        expect(screen.queryAllByText("A Test Painting").length).toBe(0);
        expect(screen.queryAllByText("A Test Cup").length).toBe(2);
        expect(screen.queryAllByText("A Test Table").length).toBe(0);
        const woodSelector = screen.getByText("wood");
        await fireEvent.click(woodSelector);
        expect(screen.queryAllByText("A Test Project").length).toBe(0);
        expect(screen.queryAllByText("A Test Painting").length).toBe(0);
        expect(screen.queryAllByText("A Test Cup").length).toBe(2);
        expect(screen.queryAllByText("A Test Table").length).toBe(2);
        await fireEvent.click(ceramicsSelector);
        expect(screen.queryAllByText("A Test Project").length).toBe(0);
        expect(screen.queryAllByText("A Test Painting").length).toBe(0);
        expect(screen.queryAllByText("A Test Cup").length).toBe(0);
        expect(screen.queryAllByText("A Test Table").length).toBe(2);
      });
    });
  });

  describe("with a single dept query param", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/something/projects?dept=ceramics"]}>
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

    it("filters projects", async () => {
      expect(screen.queryAllByText("A Test Project").length).toBe(0);
      expect(screen.queryAllByText("A Test Painting").length).toBe(0);
      expect(screen.queryAllByText("A Test Cup").length).toBe(2);
      expect(screen.queryAllByText("A Test Table").length).toBe(0);
      const ceramicsSelector = screen.getByText("ceramics");
      await fireEvent.click(ceramicsSelector);
      expect(screen.queryAllByText("A Test Project").length).toBe(2);
      expect(screen.queryAllByText("A Test Painting").length).toBe(2);
      expect(screen.queryAllByText("A Test Cup").length).toBe(2);
      expect(screen.queryAllByText("A Test Table").length).toBe(2);
    });
  });

  describe("with a comma-separated dept query param", () => {
    beforeEach(() => {
      render(
        <MemoryRouter
          initialEntries={["/something/projects?dept=ceramics,paint"]}
        >
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

    it("filters projects", async () => {
      expect(screen.queryAllByText("A Test Project").length).toBe(0);
      expect(screen.queryAllByText("A Test Painting").length).toBe(2);
      expect(screen.queryAllByText("A Test Cup").length).toBe(2);
      expect(screen.queryAllByText("A Test Table").length).toBe(0);
      const ceramicsSelector = screen.getByText("ceramics");
      await fireEvent.click(ceramicsSelector);
      expect(screen.queryAllByText("A Test Project").length).toBe(0);
      expect(screen.queryAllByText("A Test Painting").length).toBe(2);
      expect(screen.queryAllByText("A Test Cup").length).toBe(0);
      expect(screen.queryAllByText("A Test Table").length).toBe(0);
    });
  });
});
