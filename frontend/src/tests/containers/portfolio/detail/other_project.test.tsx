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
