import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Department } from "../../../../components/common/department";
import {
  OtherProjectDetailContainer,
  OTHER_PROJECT_BY_ID,
} from "../../../../containers/portfolio/detail/other_project";

const mocks = [
  {
    request: {
      query: OTHER_PROJECT_BY_ID,
      variables: { projectId: "a_test_project" },
    },
    result: {
      data: {
        otherProject: {
          __typename: "OtherProject",
          name: "A Test Project",
          date: "2025-11-29",
          description: "An experiment",
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
        },
      },
    },
  },
];

describe("OtherProjectDetailContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/other/project/a_test_project"]}>
          <Routes>
            <Route path="/other" element={<Department />}>
              <Route
                path="project/:projectId"
                element={<OtherProjectDetailContainer />}
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
