import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import CeramicsPhilosophy from "../../../components/philosophy/ceramics_philosophy";
import Department from "../../../components/common/department";

jest.mock("../../../components/common/image/preload", () => ({
  ...jest.requireActual("../../../components/common/image/preload"),
  __esModule: true,
  default: jest.fn((args) => {
    args.setIsPreloaded(true);
  }),
}));

describe("CeramicsPhilosophy", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/ceramics"]}>
        <Routes>
          <Route path="/ceramics" element={<Department />}>
            <Route index element={<CeramicsPhilosophy />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  });

  it("renders a page title", () => {
    expect(screen.getByText("Ceramics Philosophy")).toBeInTheDocument();
  });

  it("links to portfolio", () => {
    expect(screen.getByText("PORTFOLIO →").parentElement).toHaveAttribute(
      "href",
      "/portfolio/?dept=ceramics",
    );
  });
});
