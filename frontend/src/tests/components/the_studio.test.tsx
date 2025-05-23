import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import TheStudio from "../../components/the_studio/index";

describe("TheStudio", () => {
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

  it("links to personal website", () => {
    expect(
      screen.getByText("↑ about the artist ↑").parentElement,
    ).toHaveAttribute("href", "https://peternfonseca.com");
  });
});
