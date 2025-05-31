import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import CeramicsPhilosophy from "../../../components/philosophy/ceramics_philosophy";
import Department from "../../../components/common/department";

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
      "/ceramics/projects",
    );
  });
});
