import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import WoodPhilosophy from "../../../components/wood/philosophy";
import Department from "../../../components/common/department";

describe("WoodPhilosophy", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/wood"]}>
        <Routes>
          <Route path="/wood" element={<Department />}>
            <Route index element={<WoodPhilosophy />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  });

  it("renders a page title", () => {
    expect(screen.getByText("Wood Philosophy")).toBeInTheDocument();
  });

  it("links to portfolio", () => {
    expect(screen.getByText("PORTFOLIO →").parentElement).toHaveAttribute(
      "href",
      "/wood/projects",
    );
  });
});
