import React, { act } from "react";
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
    animation: {
      full: "test/1/animation/100.gif",
      half: "test/1/animation/50.gif",
      alt: "test animation 1",
    },
  };
  const IMAGE_2 = {
    full: "test/2/100.png",
    half: "test/2/50.png",
    quarter: "test/2/25.png",
    alt: "test image 2",
    neverOverlap: false,
    animation: null,
  };
  const IMAGE_3 = {
    full: "test/3/100.png",
    half: "test/3/50.png",
    quarter: "test/3/25.png",
    alt: "test image 3",
    neverOverlap: false,
    animation: null,
  };
  const IMAGE_4 = {
    full: "test/4/100.png",
    half: "test/4/50.png",
    quarter: "test/4/25.png",
    alt: "test image 4",
    neverOverlap: false,
    animation: null,
  };
  const IMAGE_5 = {
    full: "test/5/100.png",
    half: "test/5/50.png",
    quarter: "test/5/25.png",
    alt: "test image 5",
    neverOverlap: true,
    animation: null,
  };

  describe("with 0 image", () => {
    it("throws", () => {
      const errorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => {
        render(<Carousel images={[]} />);
      }).toThrow("Carousel must have at least one image");
      errorSpy.mockRestore();
    });
  });

  describe("with 1 image that has an animation", () => {
    beforeEach(async () => {
      await act(async () => render(<Carousel images={[IMAGE_1]} />));
    });

    it("displays the animation", () => {
      const mainImageElement = screen.getByTestId("carousel-main-image");
      expect(mainImageElement).toHaveAttribute(
        "src",
        "test/1/animation/100.gif",
      );
      expect(mainImageElement).toHaveAttribute(
        "alt",
        "test animation 1 (large)",
      );
    });

    it("displays no lane image", () => {
      const laneImage1Element = screen.queryByAltText("test image 1 (small)");
      const laneAnimation1Element = screen.queryByAltText(
        "test animation 1 (small)",
      );
      expect(laneImage1Element).toBeNull();
      expect(laneAnimation1Element).toBeNull();
    });
  });

  describe("with 1 image that has no animation", () => {
    beforeEach(async () => {
      await act(async () => render(<Carousel images={[IMAGE_2]} />));
    });

    it("displays the image", () => {
      const mainImageElement = screen.getByTestId("carousel-main-image");
      expect(mainImageElement).toHaveAttribute("src", "test/2/50.png");
      expect(mainImageElement).toHaveAttribute("alt", "test image 2 (large)");
    });

    it("displays no lane image", () => {
      const laneImage1Element = screen.queryByAltText("test image 2 (small)");
      expect(laneImage1Element).toBeNull();
    });
  });

  describe("with 2 images", () => {
    beforeEach(async () => {
      await act(async () => render(<Carousel images={[IMAGE_1, IMAGE_2]} />));
    });

    it("displays the first image by default", () => {
      const mainImageElement = screen.getByTestId("carousel-main-image");
      expect(mainImageElement).toHaveAttribute(
        "src",
        "test/1/animation/100.gif",
      );
      expect(mainImageElement).toHaveAttribute(
        "alt",
        "test animation 1 (large)",
      );
    });

    it("displays normal sized lane images for both images", () => {
      const laneImage1Element = screen.getByAltText("test image 1 (small)");
      const laneImage2Element = screen.getByAltText("test image 2 (small)");
      expect(laneImage1Element).toHaveAttribute(
        "class",
        "carousel-lane-image-selected",
      );
      // uses static image for animation
      expect(laneImage1Element).toHaveAttribute("src", "test/1/25.png");
      expect(laneImage2Element).toHaveAttribute("class", "carousel-lane-image");
      expect(laneImage2Element).toHaveAttribute("src", "test/2/25.png");
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
