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
          id: "a-test-shelf",
          name: "A Test Shelf",
          date: "2025-11-29",
          description: "Can never have too many shelves",
          links: [],
          images: [
            {
              full: "test-100",
              half: "test-50",
              quarter: "test-25",
              alt: "test-alt",
              neverOverlap: false,
              animation: null,
            },
          ],
          materials: "7-ply ac fir",
          finish: "linseed oil + beeswax",
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
    const testProjectEl = await screen.findByText("A Test Shelf");
    expect(testProjectEl).toBeInTheDocument();
  });
});
