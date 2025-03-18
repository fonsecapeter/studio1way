import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import {
  OtherProjectsContainer,
  OTHER_PROJECTS,
} from "../../../containers/other/projects";

const mocks = [
  {
    request: {
      query: OTHER_PROJECTS,
    },
    result: {
      data: {
        otherProjects: [
          {
            __typename: "OtherProject",
            id: "test-project",
            name: "A Test Project",
            icon: {
              __typename: "ProjectImage",
              half: "img/projects/test/main/50.png",
              alt: "photo of the void",
            },
          },
          {
            __typename: "OtherProject",
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

describe("OtherProjectsContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <OtherProjectsContainer />
        </MemoryRouter>
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
