import React from "react";
import { render, screen } from "@testing-library/react";
import TheStudio from "../../components/the_studio/index";

describe("TheStudio", () => {
  describe("when given a set of projects", () => {
    beforeEach(() => {
      render(<TheStudio />);
    });

    it("renders a page title", () => {
      expect(screen.getByText("The Studio")).toBeInTheDocument();
    });

    it("renders a todo", () => {
      expect(screen.getByText("TODO: some info here")).toBeInTheDocument();
    });
  });
});
