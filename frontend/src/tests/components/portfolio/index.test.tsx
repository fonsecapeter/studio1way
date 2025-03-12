import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Portfolio from "../../../components/portfolio/index";

describe("Portfolio", () => {
  describe("when given a set of projects", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Portfolio
            title="Test Projects"
            projects={[
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
            ]}
          />
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
  });
});
