import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import {
  WoodProjectsContainer,
  WOOD_WORKS,
} from "../../../containers/wood/projects";

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
            },
          },
          {
            __typename: "WoodWork",
            id: "another-test-project",
            name: "Another Test WoodWork",
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

describe("WoodProjectsContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <WoodProjectsContainer />
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
