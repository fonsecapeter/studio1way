import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { render, screen } from "@testing-library/react";
import {
  PaintProjectsContainer,
  GET_PROJECTS,
} from "../../../containers/paint/projects";

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

describe("PaintProjectsContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <PaintProjectsContainer />
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
