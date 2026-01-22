import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Department } from "../../../../components/common/department";
import {
  ExperimentalProjectDetailContainer,
  EXPERIMENTAL_PROJECT_BY_ID,
} from "../../../../containers/portfolio/detail/experimental_project";

const mocks = [
  {
    request: {
      query: EXPERIMENTAL_PROJECT_BY_ID,
      variables: { projectId: "a_test_project" },
    },
    result: {
      data: {
        experimentalProject: {
          __typename: "ExperimentalProject",
          id: "a-test-project",
          name: "A Test Project",
          date: "2025-11-29",
          description: "An experiment",
          links: [],
          images: [
            {
              full: "test-100",
              half: "test-50",
              quarter: "test-25",
              alt: "test-alt",
              neverOverlap: true,
              animation: null,
            },
          ],
          variety: null,
          video: null,
        },
      },
    },
  },
];

describe("ExperimentalProjectDetailContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/experimental/project/a_test_project"]}>
          <Routes>
            <Route path="/experimental" element={<Department />}>
              <Route
                path="project/:projectId"
                element={<ExperimentalProjectDetailContainer />}
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    );
  });

  it("passes a project to the detail component", async () => {
    const testProjectEl = await screen.findByText("A Test Project");
    expect(testProjectEl).toBeInTheDocument();
  });
});
