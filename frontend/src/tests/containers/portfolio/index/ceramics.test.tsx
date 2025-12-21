import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import {
  CeramicsPortfolioIndexContainer,
  CERAMIC_WARES,
} from "../../../../containers/portfolio/index/ceramics";

const mocks = [
  {
    request: {
      query: CERAMIC_WARES,
    },
    result: {
      data: {
        ceramicWares: [
          {
            __typename: "CeramicWare",
            id: "test-project",
            name: "A Test CeramicWare",
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
            __typename: "CeramicWare",
            id: "another-test-project",
            name: "Another Test CeramicWare",
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

describe("CeramicsPortfolioIndexContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <CeramicsPortfolioIndexContainer />
        </MemoryRouter>
      </MockedProvider>,
    );
  });

  it("passes projects to the Portfolio component", async () => {
    const testProjectEl = await screen.findByText("A Test CeramicWare");
    const anotherTestProjectEl = await screen.findByText(
      "Another Test CeramicWare",
    );
    expect(testProjectEl).toBeInTheDocument();
    expect(anotherTestProjectEl).toBeInTheDocument();
  });
});
