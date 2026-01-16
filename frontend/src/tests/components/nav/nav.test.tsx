import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "../../../components/nav/index";

describe("Nav", () => {
  describe("by default", () => {
    beforeEach(() => {
      global.window = Object.create(window);
      Object.defineProperty(window, "location", {
        value: {
          href: "https://studio1way.com",
          pathname: "",
        },
        writable: true,
      });
      Object.defineProperty(window, "scrollTo", { value: () => {} });
      render(
        <MemoryRouter>
          <Nav />
        </MemoryRouter>,
      );
    });

    it("renders all links", () => {
      expect(screen.getByText("The Studio")).toBeInTheDocument();
      expect(screen.getByText("Portfolio")).toBeInTheDocument();
      expect(screen.getByText("Ceramics")).toBeInTheDocument();
      expect(screen.getByText("Paint")).toBeInTheDocument();
      expect(screen.getByText("Wood")).toBeInTheDocument();
      expect(screen.getByText("Other")).toBeInTheDocument();
    });

    it("activates the studio link", () => {
      expect(screen.getByText("The Studio")).toHaveAttribute(
        "class",
        "nav-link-active",
      );
      expect(screen.getByText("Portfolio")).toHaveAttribute(
        "class",
        "nav-link",
      );
      expect(screen.getByText("Ceramics")).toHaveAttribute("class", "nav-link");
      expect(screen.getByText("Paint")).toHaveAttribute("class", "nav-link");
      expect(screen.getByText("Wood")).toHaveAttribute("class", "nav-link");
      expect(screen.getByText("Other")).toHaveAttribute("class", "nav-link");
    });
  });

  describe("with a trailing slash", () => {
    beforeEach(() => {
      global.window = Object.create(window);
      Object.defineProperty(window, "location", {
        value: {
          href: "https://studio1way.com/",
          pathname: "/",
        },
        writable: true,
      });
      Object.defineProperty(window, "scrollTo", { value: () => {} });
      render(
        <MemoryRouter>
          <Nav />
        </MemoryRouter>,
      );
    });

    it("activates the studio link", () => {
      expect(screen.getByText("The Studio")).toHaveAttribute(
        "class",
        "nav-link-active",
      );
      expect(screen.getByText("Portfolio")).toHaveAttribute(
        "class",
        "nav-link",
      );
      expect(screen.getByText("Ceramics")).toHaveAttribute("class", "nav-link");
      expect(screen.getByText("Paint")).toHaveAttribute("class", "nav-link");
      expect(screen.getByText("Wood")).toHaveAttribute("class", "nav-link");
      expect(screen.getByText("Other")).toHaveAttribute("class", "nav-link");
    });
  });

  describe("when on a page", () => {
    beforeEach(() => {
      global.window = Object.create(window);
      Object.defineProperty(window, "location", {
        value: {
          href: "https://studio1way.com/ceramics",
          pathname: "/ceramics",
        },
        writable: true,
      });
      render(
        <MemoryRouter initialEntries={["/ceramics"]}>
          <Nav />
        </MemoryRouter>,
      );
    });

    it("activates the matching link", () => {
      expect(screen.getByText("The Studio")).toHaveAttribute(
        "class",
        "nav-link",
      );
      expect(screen.getByText("Portfolio")).toHaveAttribute(
        "class",
        "nav-link",
      );
      expect(screen.getByText("Ceramics")).toHaveAttribute(
        "class",
        "nav-link-active",
      );
      expect(screen.getByText("Paint")).toHaveAttribute("class", "nav-link");
      expect(screen.getByText("Wood")).toHaveAttribute("class", "nav-link");
      expect(screen.getByText("Other")).toHaveAttribute("class", "nav-link");
    });
  });
});
