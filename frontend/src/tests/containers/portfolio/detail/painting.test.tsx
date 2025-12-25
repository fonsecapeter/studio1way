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
          name: "A Test Painting",
          date: "2025-11-29",
          description: "Painting of a test",
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
          medium: "oil",
          surface: "canvas",
          varnished: false,
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
    const testProjectEl = await screen.findByText("A Test Painting");
    expect(testProjectEl).toBeInTheDocument();
  });
});
