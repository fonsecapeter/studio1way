import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import {
  CeramicsProjectsContainer,
  CERAMIC_WARES,
} from "../../../containers/ceramics/projects";

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
            },
          },
          {
            __typename: "CeramicWare",
            id: "another-test-project",
            name: "Another Test CeramicWare",
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

describe("CeramicsProjectsContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <CeramicsProjectsContainer />
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
