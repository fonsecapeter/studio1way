import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioItem from "../../../components/common/portfolio/item";

describe("PortfolioItem", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PortfolioItem
          project={{
            id: "a_test_project",
            name: "A Test Project",
            icon: {
              half: "test_img/50.png",
              alt: "fake image",
            },
          }}
        />
      </MemoryRouter>,
    );
  });

  it("renders the project name", () => {
    expect(screen.getByText("A Test Project")).toBeInTheDocument();
  });
});
