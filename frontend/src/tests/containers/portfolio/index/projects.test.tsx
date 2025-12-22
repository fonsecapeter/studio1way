import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import {
  ProjectsPortfolioIndexContainer,
  PROJECTS,
} from "../../../../containers/portfolio/index/projects";

const mocks = [
  {
    request: {
      query: PROJECTS,
    },
    result: {
      data: {
        projects: [
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
            __typename: "Painting",
            id: "test-project",
            name: "A Test Painting",
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
            __typename: "OtherProject",
            id: "another-test-project",
            name: "A Test Project",
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

describe("PorfolioPortfolioIndexContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <ProjectsPortfolioIndexContainer />
        </MemoryRouter>
      </MockedProvider>,
    );
  });

  it("passes projects to the Portfolio component", async () => {
    // get first bc there's one for mobile, one for desktop
    const testCeramicWareEl = (
      await screen.findAllByText("A Test CeramicWare")
    )[0];
    const testWoodWorkEl = (await screen.findAllByText("A Test WoodWork"))[0];
    const testPaintingEl = (await screen.findAllByText("A Test Painting"))[0];
    const testProjectEl = (await screen.findAllByText("A Test Project"))[0];
    expect(testCeramicWareEl).toBeInTheDocument();
    expect(testWoodWorkEl).toBeInTheDocument();
    expect(testPaintingEl).toBeInTheDocument();
    expect(testProjectEl).toBeInTheDocument();
  });
});
