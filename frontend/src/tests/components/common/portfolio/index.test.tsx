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
      __typename: CATEGORY.OTHER,
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

    it("renders each project item", () => {
      expect(screen.getByText("A Test Project")).toBeInTheDocument();
      expect(screen.getByText("A Test Painting")).toBeInTheDocument();
      expect(screen.getByText("A Test Cup")).toBeInTheDocument();
      expect(screen.getByText("A Test Table")).toBeInTheDocument();
      expect(screen.getAllByAltText("fake image").length).toBe(4);
    });

    describe("the department filter", () => {
      it("exists", () => {
        expect(screen.getByText("↓ department ↓"));
      });

      it("filters projects", async () => {
        const filterButton = screen.getByText("↓ department ↓");
        await fireEvent.click(filterButton);
        const ceramicsSelector = screen.getByText("ceramics");
        await fireEvent.click(ceramicsSelector);
        expect(screen.queryByText("A Test Project")).not.toBeInTheDocument();
        expect(screen.queryByText("A Test Painting")).not.toBeInTheDocument();
        expect(screen.queryByText("A Test Cup")).toBeInTheDocument();
        expect(screen.queryByText("A Test Table")).not.toBeInTheDocument();
        const woodSelector = screen.getByText("wood");
        await fireEvent.click(woodSelector);
        expect(screen.queryByText("A Test Project")).not.toBeInTheDocument();
        expect(screen.queryByText("A Test Painting")).not.toBeInTheDocument();
        expect(screen.queryByText("A Test Cup")).toBeInTheDocument();
        expect(screen.queryByText("A Test Table")).toBeInTheDocument();
        await fireEvent.click(ceramicsSelector);
        expect(screen.queryByText("A Test Project")).not.toBeInTheDocument();
        expect(screen.queryByText("A Test Painting")).not.toBeInTheDocument();
        expect(screen.queryByText("A Test Cup")).not.toBeInTheDocument();
        expect(screen.queryByText("A Test Table")).toBeInTheDocument();
      });
    });
  });

  describe("with the dept query param", () => {
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
      expect(screen.queryByText("A Test Project")).not.toBeInTheDocument();
      expect(screen.queryByText("A Test Painting")).not.toBeInTheDocument();
      expect(screen.queryByText("A Test Cup")).toBeInTheDocument();
      expect(screen.queryByText("A Test Table")).not.toBeInTheDocument();
      const filterButton = screen.getByText("↓ department ↓");
      await fireEvent.click(filterButton);
      const ceramicsSelector = screen.getByText("ceramics");
      await fireEvent.click(ceramicsSelector);
      expect(screen.queryByText("A Test Project")).toBeInTheDocument();
      expect(screen.queryByText("A Test Painting")).toBeInTheDocument();
      expect(screen.queryByText("A Test Cup")).toBeInTheDocument();
      expect(screen.queryByText("A Test Table")).toBeInTheDocument();
    });
  });
});
