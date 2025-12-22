import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import OtherPhilosophy from "../../../components/philosophy/other_philosophy";
import Department from "../../../components/common/department";

describe("OtherPhilosophy", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/other"]}>
        <Routes>
          <Route path="/other" element={<Department />}>
            <Route index element={<OtherPhilosophy />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  });

  it("renders a page title", () => {
    expect(screen.getByText("Experimentation Philosophy")).toBeInTheDocument();
  });

  it("links to portfolio", () => {
    expect(screen.getByText("PORTFOLIO →").parentElement).toHaveAttribute(
      "href",
      "/portfolio/?dept=other",
    );
  });
});
