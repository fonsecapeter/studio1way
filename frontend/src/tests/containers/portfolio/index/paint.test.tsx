import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import {
  PaintPortfolioIndexContainer,
  PAINTINGS,
} from "../../../../containers/portfolio/index/paint";

const mocks = [
  {
    request: {
      query: PAINTINGS,
    },
    result: {
      data: {
        paintings: [
          {
            __typename: "Painting",
            id: "test-project",
            name: "A Test Painting",
            icon: {
              __typename: "ProjectImage",
              half: "img/projects/test/main/50.png",
              alt: "photo of the void",
            },
          },
          {
            __typename: "Painting",
            id: "another-test-project",
            name: "Another Test Painting",
            icon: {
              __typename: "ProjectImage",
              half: "img/projects/another-test/main/50.png",
              alt: "painting of the void",
            },
          },
        ],
      },
    },
  },
];

describe("PaintPortfolioIndexContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <PaintPortfolioIndexContainer />
        </MemoryRouter>
      </MockedProvider>,
    );
  });

  it("passes projects to the Portfolio component", async () => {
    const testProjectEl = await screen.findByText("A Test Painting");
    const anotherTestProjectEl = await screen.findByText(
      "Another Test Painting",
    );
    expect(testProjectEl).toBeInTheDocument();
    expect(anotherTestProjectEl).toBeInTheDocument();
  });
});
