import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { render, screen } from "@testing-library/react";
import { App, GET_PROJECTS } from "../../components/app";

const mocks = [
  {
    request: {
      query: GET_PROJECTS,
    },
    result: {
      data: {
        projects: [
          {
            id: "test-project",
            name: "A Test Project",
            description: "For testing purposes.",
            links: [
              {
                url: "https://www.something.net",
                text: "test",
              },
            ],
          },
          {
            id: "another-test-project",
            name: "Another Test Project",
            description: "Like test-project, but not test-project.",
            links: [
              {
                url: "https://www.somethingelse.org",
                text: "test",
              },
            ],
          },
        ],
      },
    },
  },
];

describe("App", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>,
    );
  });

  it("renders a static description", async () => {
    const descriptionEl = await screen.findByText(
      "this is a work in progress, here are some projects:",
    );
    expect(descriptionEl).toBeInTheDocument();
  });

  it("renders some sample projects", async () => {
    const testProjectEl = await screen.findByText("A Test Project");
    const anotherTestProjectEl = await screen.findByText(
      "Another Test Project",
    );
    expect(testProjectEl).toBeInTheDocument();
    expect(anotherTestProjectEl).toBeInTheDocument();
  });
});
