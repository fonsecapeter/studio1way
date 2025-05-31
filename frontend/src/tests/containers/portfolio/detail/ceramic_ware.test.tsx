import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Department } from "../../../../components/common/department";
import {
  CeramicWareProjectDetailContainer,
  CERAMIC_WARE_BY_ID,
} from "../../../../containers/portfolio/detail/ceramic_ware";

const mocks = [
  {
    request: {
      query: CERAMIC_WARE_BY_ID,
      variables: { projectId: "a_test_project" },
    },
    result: {
      data: {
        ceramicWare: {
          __typename: "CeramicWare",
          name: "A Test Project",
        },
      },
    },
  },
];

describe("CeramicWareProjectDetailContainer", () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/ceramics/project/a_test_project"]}>
          <Routes>
            <Route path="/ceramics" element={<Department />}>
              <Route
                path="project/:projectId"
                element={<CeramicWareProjectDetailContainer />}
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
