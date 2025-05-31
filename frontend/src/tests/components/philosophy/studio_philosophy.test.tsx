import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import StudioPhilosophy from "../../../components/philosophy/studio_philosophy";

describe("StudioPhilosophy", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <StudioPhilosophy />
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
