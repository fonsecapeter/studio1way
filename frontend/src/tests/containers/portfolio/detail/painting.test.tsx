import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Department } from "../../../../components/common/department";
import {
  PaintingProjectDetailContainer,
  PAINTING_BY_ID,
} from "../../../../containers/portfolio/detail/painting";

const mocks = [
  {
    request: {
      query: PAINTING_BY_ID,
      variables: { projectId: "a_test_project" },
    },
    result: {
      data: {
        painting: {
          __typename: "Painting",
          name: "A Test Project",
        },
      },
    },
  },
];

describe("PaintingProjectDetailContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/paint/project/a_test_project"]}>
          <Routes>
            <Route path="/paint" element={<Department />}>
              <Route
                path="project/:projectId"
                element={<PaintingProjectDetailContainer />}
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
