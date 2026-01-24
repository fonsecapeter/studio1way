import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavLink from "../../../components/nav/link";

describe("NavLink", () => {
  describe("when not active", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <NavLink name="Test" to="/test" active={false} />
        </MemoryRouter>,
      );
    });

    it("renders the name", () => {
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("links to the given destination", () => {
      expect(screen.getByText("Test")).toHaveAttribute("href", "/test");
    });

    it("has an inactive class", () => {
      expect(screen.getByText("Test")).toHaveAttribute("class", "nav-link");
    });
  });

  describe("when active", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <NavLink name="Test" to="/test" active={true} />
        </MemoryRouter>,
      );
    });

    it("renders the name", () => {
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("has no link", () => {
      expect(screen.getByText("Test")).not.toHaveAttribute("href");
    });

    it("has an active class", () => {
      expect(screen.getByText("Test")).toHaveAttribute(
        "class",
        "nav-link-active",
      );
    });
  });
});
