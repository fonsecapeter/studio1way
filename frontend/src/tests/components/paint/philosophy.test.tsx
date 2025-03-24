import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import PaintPhilosophy from "../../../components/paint/philosophy";
import Department from "../../../components/common/department";

describe("PaintPhilosophy", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/paint"]}>
        <Routes>
          <Route path="/paint" element={<Department />}>
            <Route index element={<PaintPhilosophy />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  });

  it("renders a page title", () => {
    expect(screen.getByText("Painting Philosophy")).toBeInTheDocument();
  });

  it("links to portfolio", () => {
    expect(screen.getByText("PORTFOLIO →").parentElement).toHaveAttribute(
      "href",
      "/paint/projects",
    );
  });
});
