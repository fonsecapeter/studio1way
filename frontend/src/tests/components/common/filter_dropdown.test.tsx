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

    test("renders the name", () => {
      expect(screen.getByText("↓ Test Filter ↓")).toBeInTheDocument();
    });

    test("toggles dropdown when clicked", async () => {
      expect(screen.queryByText("Something")).not.toBeInTheDocument();
      expect(screen.queryByText("Another")).not.toBeInTheDocument();
      expect(screen.queryByText("One More")).not.toBeInTheDocument();
      const button = screen.getByText("↓ Test Filter ↓");
      await fireEvent.click(button);
      expect(screen.queryByText("Something")).toBeInTheDocument();
      expect(screen.queryByText("Another")).toBeInTheDocument();
      expect(screen.queryByText("One More")).toBeInTheDocument();
      await fireEvent.click(button);
      expect(screen.queryByText("Something")).not.toBeInTheDocument();
      expect(screen.queryByText("Another")).not.toBeInTheDocument();
      expect(screen.queryByText("One More")).not.toBeInTheDocument();
    });

    test("adds option when selected", async () => {
      const button = screen.getByText("↓ Test Filter ↓");
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

    test("can select another option", async () => {
      const button = screen.getByText("↓ Test Filter ↓");
      await fireEvent.click(button);
      await fireEvent.click(screen.getByText("Something"));
      const expectedSelections = new Set();
      expectedSelections.add("oneMore");
      expectedSelections.add("something");
      expect(mockOnChange).toHaveBeenCalledWith(expectedSelections);
    });

    test("can un-select the option", async () => {
      const button = screen.getByText("↓ Test Filter ↓");
      await fireEvent.click(button);
      await fireEvent.click(screen.getByText("One More"));
      expect(mockOnChange).toHaveBeenCalledWith(new Set());
    });
  });
});
