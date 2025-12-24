import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterDropdown } from "../../../components/common/filter_dropdown";

const mockOnChange = jest.fn();
const options = {
  something: "Something",
  another: "Another",
  oneMore: "One More",
};

describe("FilterDropdown", () => {
  describe("with nothing selected", () => {
    beforeEach(() => {
      render(
        <FilterDropdown
          name="Test Filter"
          options={options}
          selectedOptions={new Set()}
          onChange={mockOnChange}
        />,
      );
    });

    it("renders the name", () => {
      expect(screen.getByText("Test Filter ↓")).toBeInTheDocument();
    });

    it("renders no count prefix", () => {
      expect(screen.queryByText("(1)")).not.toBeInTheDocument();
      expect(screen.queryByText("(2)")).not.toBeInTheDocument();
      expect(screen.queryByText("(3)")).not.toBeInTheDocument();
    });

    it("toggles dropdown when clicked", async () => {
      expect(screen.queryByText("Something")).not.toBeInTheDocument();
      expect(screen.queryByText("Another")).not.toBeInTheDocument();
      expect(screen.queryByText("One More")).not.toBeInTheDocument();
      const button = screen.getByText("Test Filter ↓");
      await fireEvent.click(button);
      expect(screen.queryByText("Something")).toBeInTheDocument();
      expect(screen.queryByText("Another")).toBeInTheDocument();
      expect(screen.queryByText("One More")).toBeInTheDocument();
      await fireEvent.click(button);
      expect(screen.queryByText("Something")).not.toBeInTheDocument();
      expect(screen.queryByText("Another")).not.toBeInTheDocument();
      expect(screen.queryByText("One More")).not.toBeInTheDocument();
    });

    it("adds option when selected", async () => {
      const button = screen.getByText("Test Filter ↓");
      await fireEvent.click(button);
      await fireEvent.click(screen.getByText("Something"));
      expect(mockOnChange).toHaveBeenCalledWith(new Set().add("something"));
    });
  });

  describe("with something selected", () => {
    beforeEach(() => {
      const selected: Set<string> = new Set();
      selected.add("oneMore");
      render(
        <FilterDropdown
          name="Test Filter"
          options={options}
          selectedOptions={selected}
          onChange={mockOnChange}
        />,
      );
    });

    it("renders a count prefix", () => {
      expect(screen.queryByText("(1)")).toBeInTheDocument();
      expect(screen.queryByText("(2)")).not.toBeInTheDocument();
      expect(screen.queryByText("(3)")).not.toBeInTheDocument();
    });

    it("starts with the dropdown open", () => {
      expect(screen.getByText("Test Filter ↑")).toBeInTheDocument();
      expect(screen.queryByText("Something")).toBeInTheDocument();
      expect(screen.queryByText("Another")).toBeInTheDocument();
      expect(screen.queryByText("One More")).toBeInTheDocument();
    });

    it("can select another option", async () => {
      await fireEvent.click(screen.getByText("Something"));
      const expectedSelections = new Set();
      expectedSelections.add("oneMore");
      expectedSelections.add("something");
      expect(mockOnChange).toHaveBeenCalledWith(expectedSelections);
    });

    it("can un-select the option", async () => {
      await fireEvent.click(screen.getByText("One More"));
      expect(mockOnChange).toHaveBeenCalledWith(new Set());
    });
  });

  describe("with 2 selections", () => {
    beforeEach(() => {
      const selected: Set<string> = new Set();
      selected.add("something");
      selected.add("oneMore");
      render(
        <FilterDropdown
          name="Test Filter"
          options={options}
          selectedOptions={selected}
          onChange={mockOnChange}
        />,
      );
    });

    it("renders a count prefix", () => {
      expect(screen.queryByText("(1)")).not.toBeInTheDocument();
      expect(screen.queryByText("(2)")).toBeInTheDocument();
      expect(screen.queryByText("(3)")).not.toBeInTheDocument();
    });
  });

  describe("with all selections", () => {
    beforeEach(() => {
      const selected: Set<string> = new Set();
      selected.add("something");
      selected.add("another");
      selected.add("oneMore");
      render(
        <FilterDropdown
          name="Test Filter"
          options={options}
          selectedOptions={selected}
          onChange={mockOnChange}
        />,
      );
    });

    it("renders no count prefix", () => {
      expect(screen.queryByText("(1)")).not.toBeInTheDocument();
      expect(screen.queryByText("(2)")).not.toBeInTheDocument();
      expect(screen.queryByText("(3)")).not.toBeInTheDocument();
    });
  });
});
