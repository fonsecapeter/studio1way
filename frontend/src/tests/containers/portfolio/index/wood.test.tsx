import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import {
  WoodPortfolioIndexContainer,
  WOOD_WORKS,
} from "../../../../containers/portfolio/index/wood";

const mocks = [
  {
    request: {
      query: WOOD_WORKS,
    },
    result: {
      data: {
        woodWorks: [
          {
            __typename: "WoodWork",
            id: "test-project",
            name: "A Test WoodWork",
            icon: {
              __typename: "ProjectImage",
              half: "img/projects/test/main/50.png",
              alt: "photo of the void",
              animation: null,
            },
            images: [
              {
                full: "img/projects/test/main/100.png",
                half: "img/projects/test/main/50.png",
                quarter: "img/projects/test/main/25.png",
                alt: "photo of the void",
                neverOverlap: false,
                animation: null,
              },
            ],
          },
          {
            __typename: "WoodWork",
            id: "another-test-project",
            name: "Another Test WoodWork",
            icon: {
              __typename: "ProjectImage",
              half: "img/projects/another-test/main/50.png",
              alt: "painting of the void",
              animation: {
                full: "img/projects/another-test/main/animation/100.gif",
                half: "img/projects/another-test/main/animation/50.gif",
                alt: "void painting animation",
              },
            },
            images: [
              {
                full: "img/projects/another-test/main/100.png",
                half: "img/projects/another-test/main/50.png",
                quarter: "img/projects/another-test/main/25.png",
                alt: "test image 2",
                neverOverlap: false,
                animation: {
                  full: "img/projects/another-test/main/animation/100.gif",
                  half: "img/projects/another-test/main/animation/50.gif",
                  alt: "void painting animation",
                },
              },
            ],
          },
        ],
      },
    },
  },
];

describe("WoodPortfolioIndexContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <WoodPortfolioIndexContainer />
        </MemoryRouter>
      </MockedProvider>,
    );
  });

  it("passes projects to the Portfolio component", async () => {
    const testProjectEl = await screen.findByText("A Test WoodWork");
    const anotherTestProjectEl = await screen.findByText(
      "Another Test WoodWork",
    );
    expect(testProjectEl).toBeInTheDocument();
    expect(anotherTestProjectEl).toBeInTheDocument();
  });
});
