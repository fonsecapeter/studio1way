import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Department } from "../../../../components/common/department";
import {
  WoodWorkProjectDetailContainer,
  WOOD_WORK_BY_ID,
} from "../../../../containers/portfolio/detail/wood_work";

const mocks = [
  {
    request: {
      query: WOOD_WORK_BY_ID,
      variables: { projectId: "a_test_project" },
    },
    result: {
      data: {
        woodWork: {
          __typename: "WoodWork",
          name: "A Test Project",
        },
      },
    },
  },
];

describe("WoodWorkProjectDetailContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/wood/project/a_test_project"]}>
          <Routes>
            <Route path="/wood" element={<Department />}>
              <Route
                path="project/:projectId"
                element={<WoodWorkProjectDetailContainer />}
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
