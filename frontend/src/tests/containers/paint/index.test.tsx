import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { render, screen } from "@testing-library/react";
import {
  PaintProjectsContainer,
  PAINTINGS,
} from "../../../containers/paint/projects";

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

describe("PaintProjectsContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <PaintProjectsContainer />
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
