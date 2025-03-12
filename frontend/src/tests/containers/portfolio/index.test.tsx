import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { render, screen } from "@testing-library/react";
import {
  PortfolioContainer,
  GET_PROJECTS,
} from "../../../containers/portfolio";

const mocks = [
  {
    request: {
      query: GET_PROJECTS,
    },
    result: {
      data: {
        projects: [
          {
            __typename: "Project",
            id: "test-project",
            name: "A Test Project",
            icon: {
              __typename: "ProjectImage",
              half: "img/projects/test/main/50.png",
              alt: "photo of the void",
            },
          },
          {
            __typename: "Project",
            id: "another-test-project",
            name: "Another Test Project",
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

describe("PortfolioContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <PortfolioContainer />
      </MockedProvider>,
    );
  });

  it("passes projects to the Portfolio component", async () => {
    const testProjectEl = await screen.findByText("A Test Project");
    const anotherTestProjectEl = await screen.findByText(
      "Another Test Project",
    );
    expect(testProjectEl).toBeInTheDocument();
    expect(anotherTestProjectEl).toBeInTheDocument();
  });
});
