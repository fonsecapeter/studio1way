import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageModal from "../../../../components/common/image/modal";

const TestComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        data-testid="test-modal-open-button"
        onClick={() => setIsOpen(true)}
      />
      <ImageModal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <img data-testid="test-modal-content" />
      </ImageModal>
    </>
  );
};

describe("ImageModal", () => {
  describe("by default", () => {
    beforeEach(async () => {
      render(<TestComponent />);
    });

    it("is hidden when not isOpen", () => {
      expect(screen.queryByTestId("test-modal-content")).toBeNull();
    });

    it("renders when isOpen", () => {
      fireEvent.click(screen.getByTestId("test-modal-open-button"));
      expect(screen.getByTestId("test-modal-content")).toBeInTheDocument();
    });

    it("includes a close button", () => {
      fireEvent.click(screen.getByTestId("test-modal-open-button"));
      fireEvent.click(screen.getByText("x"));
      expect(screen.queryByTestId("test-modal-content")).toBeNull();
    });

    it("renders the close button directly over the image", () => {
      fireEvent.click(screen.getByTestId("test-modal-open-button"));
      expect(screen.queryByTestId("image-modal-top-gap")).toBeNull();
    });
  });

  describe("with topGap=True", () => {
    it("renders the gap to isolate the close button", () => {
      render(
        <ImageModal isOpen closeModal={() => {}} withTopGap>
          <img data-testid="test-modal-content" />
        </ImageModal>,
      );
      expect(screen.queryByTestId("image-modal-top-gap")).toBeInTheDocument();
    });
  });
});
