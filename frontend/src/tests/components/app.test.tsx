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
            materials: ["void"],
            images: [
              {
                full: "img/projects/test/main/100.png",
                half: "img/projects/test/main/50.png",
                quarter: "img/projects/test/main/25.png",
                alt: "photo of the void",
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
            materials: ["oil", "on void"],
            images: [
              {
                full: "img/projects/another-test/main/100.png",
                half: "img/projects/another-test/main/50.png",
                quarter: "img/projects/another-test/main/25.png",
                alt: "painting of the void",
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
