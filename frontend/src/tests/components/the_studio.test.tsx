import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import TheStudio from "../../components/the_studio/index";

describe("TheStudio", () => {
  describe("when given a set of projects", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <TheStudio />
        </MemoryRouter>,
      );
    });

    it("renders a page title", () => {
      expect(screen.getByText("The Studio of P. Fonseca")).toBeInTheDocument();
    });

    it("renders a description", () => {
      expect(screen.getByText(/art is everywhere/i)).toBeInTheDocument();
    });
  });
});
