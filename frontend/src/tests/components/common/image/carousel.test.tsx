import React, { act } from "react";
// import { jest } from '@jest/globals';
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "../../../../components/common/image/carousel";

jest.mock("../../../../components/common/image/preload", () => ({
  ...jest.requireActual("../../../../components/common/image/preload"),
  __esModule: true,
  default: jest.fn((args) => {
    args.setIsPreloaded(true);
  }),
}));

describe("Crousel", () => {
  const IMAGE_1 = {
    full: "test/1/100.png",
    half: "test/1/50.png",
    quarter: "test/1/25.png",
    alt: "test image 1",
    neverOverlap: false,
  };
  const IMAGE_2 = {
    full: "test/2/100.png",
    half: "test/2/50.png",
    quarter: "test/2/25.png",
    alt: "test image 2",
    neverOverlap: false,
  };
  const IMAGE_3 = {
    full: "test/3/100.png",
    half: "test/3/50.png",
    quarter: "test/3/25.png",
    alt: "test image 3",
    neverOverlap: false,
  };
  const IMAGE_4 = {
    full: "test/4/100.png",
    half: "test/4/50.png",
    quarter: "test/4/25.png",
    alt: "test image 4",
    neverOverlap: false,
  };
  const IMAGE_5 = {
    full: "test/5/100.png",
    half: "test/5/50.png",
    quarter: "test/5/25.png",
    alt: "test image 5",
    neverOverlap: true,
  };

  describe("with 0 image", () => {
    it("throws", async () => {
      await expect(async () => {
        await render(<Carousel images={[]} />);
      }).rejects.toThrow("Carousel must have at least one image");
    });
  });

  describe("with 1 image", () => {
    beforeEach(async () => {
      await act(async () => render(<Carousel images={[IMAGE_1]} />));
    });

    it("can render", () => {
      const crouselElement = screen.getByTestId("carousel");
      expect(crouselElement).toBeInTheDocument();
    });

    it("displays the image", () => {
      const mainImageElement = screen.getByTestId("carousel-main-image");
      expect(mainImageElement).toHaveAttribute("src", "test/1/50.png");
    });

    it("displays normal sized lane images for both images", () => {
      const laneImage1Element = screen.queryByAltText("test image 1 (small)");
      expect(laneImage1Element).toBeNull();
    });
  });

  describe("with 2 images", () => {
    beforeEach(async () => {
      await act(async () => render(<Carousel images={[IMAGE_1, IMAGE_2]} />));
    });

    it("displays the first image by default", () => {
      const mainImageElement = screen.getByTestId("carousel-main-image");
      expect(mainImageElement).toHaveAttribute("src", "test/1/50.png");
    });

    it("displays normal sized lane images for both images", () => {
      const laneImage1Element = screen.getByAltText("test image 1 (small)");
      const laneImage2Element = screen.getByAltText("test image 2 (small)");
      expect(laneImage1Element).toHaveAttribute(
        "class",
        "carousel-lane-image-selected",
      );
      expect(laneImage2Element).toHaveAttribute("class", "carousel-lane-image");
    });

    describe("when a lane image is clicked on", () => {
      it("replaces the main image", () => {
        const secondImage = screen.getByAltText("test image 2 (small)");
        fireEvent.click(secondImage);
        const mainImageElement = screen.getByTestId("carousel-main-image");
        expect(mainImageElement).toHaveAttribute("src", "test/2/50.png");
      });
    });
  });

  describe("with 5 images", () => {
    it("displays mini lane images for all images", () => {
      render(
        <Carousel images={[IMAGE_1, IMAGE_2, IMAGE_3, IMAGE_4, IMAGE_5]} />,
      );
      const laneImage1Element = screen.getByAltText("test image 1 (small)");
      const laneImage2Element = screen.getByAltText("test image 2 (small)");
      const laneImage3Element = screen.getByAltText("test image 3 (small)");
      const laneImage4Element = screen.getByAltText("test image 4 (small)");
      const laneImage5Element = screen.getByAltText("test image 5 (small)");
      expect(laneImage1Element).toHaveAttribute(
        "class",
        "carousel-lane-image-mini-selected",
      );
      expect(laneImage2Element).toHaveAttribute(
        "class",
        "carousel-lane-image-mini",
      );
      expect(laneImage3Element).toHaveAttribute(
        "class",
        "carousel-lane-image-mini",
      );
      expect(laneImage4Element).toHaveAttribute(
        "class",
        "carousel-lane-image-mini",
      );
      expect(laneImage5Element).toHaveAttribute(
        "class",
        "carousel-lane-image-mini",
      );
    });
  });
});
