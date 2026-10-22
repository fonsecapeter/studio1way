import React from "react";
import { render, screen } from "@testing-library/react";
import ResponsiveImage, {
  withFormat,
} from "../../../../components/common/image/responsive_image";

describe("withFormat", () => {
  it("swaps the extension", () => {
    expect(withFormat("/img/projects/x/50.jpg", "webp")).toBe(
      "/img/projects/x/50.webp",
    );
    expect(withFormat("/img/projects/x/50.png", "avif")).toBe(
      "/img/projects/x/50.avif",
    );
  });
});

describe("ResponsiveImage", () => {
  it("renders avif and webp sources ahead of the img", () => {
    const { container } = render(
      <ResponsiveImage src="/img/x/25.jpg" alt="x" />,
    );
    const sources = container.querySelectorAll("source");
    expect(sources[0]).toHaveAttribute("type", "image/avif");
    expect(sources[0]).toHaveAttribute("srcset", "/img/x/25.avif");
    expect(sources[1]).toHaveAttribute("type", "image/webp");
    expect(sources[1]).toHaveAttribute("srcset", "/img/x/25.webp");
    expect(screen.getByAltText("x")).toHaveAttribute("src", "/img/x/25.jpg");
  });

  it("builds width-descriptor srcsets from the tiers", () => {
    const { container } = render(
      <ResponsiveImage
        src="/img/x/50.jpg"
        alt="x"
        width={2000}
        height={1000}
        tiers={{
          quarter: "/img/x/25.jpg",
          half: "/img/x/50.jpg",
          full: "/img/x/100.jpg",
        }}
        sizes="100vw"
      />,
    );
    const sources = container.querySelectorAll("source");
    expect(sources[0]).toHaveAttribute(
      "srcset",
      "/img/x/25.avif 500w, /img/x/50.avif 1000w, /img/x/100.avif 2000w",
    );
    const img = screen.getByAltText("x");
    expect(img).toHaveAttribute(
      "srcset",
      "/img/x/25.jpg 500w, /img/x/50.jpg 1000w, /img/x/100.jpg 2000w",
    );
    expect(img).toHaveAttribute("width", "2000");
    expect(img).toHaveAttribute("height", "1000");
  });
});
