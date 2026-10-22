import React, { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Portfolio from "../../../../components/common/portfolio/index";
import preloadImages from "../../../../components/common/image/preload";
import { CATEGORY } from "../../../../utils";

jest.mock("../../../../components/common/image/preload", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedPreload = preloadImages as jest.Mock;

const makeProjects = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    __typename: CATEGORY.WOOD_WORK,
    id: `project_${i}`,
    name: `Project ${i}`,
    icon: {
      quarter: `test_img/${i}/25.png`,
      width: 1000,
      height: 750,
      alt: "fake image",
      animation: null,
    },
  }));

const renderPortfolio = (count: number) =>
  render(
    <MemoryRouter>
      <Portfolio title="Test Projects" projects={makeProjects(count)} />
    </MemoryRouter>,
  );

const iconCount = () =>
  document.querySelectorAll('img[alt="fake image"]').length;

describe("Portfolio icon loading", () => {
  const resolvers: Array<() => void> = [];

  beforeEach(() => {
    resolvers.length = 0;
    mockedPreload.mockReset();
    mockedPreload.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolvers.push(resolve);
        }),
    );
  });

  afterEach(() => {
    delete (global as any).IntersectionObserver;
  });

  describe("without IntersectionObserver", () => {
    it("loads icons in capped batches", async () => {
      renderPortfolio(12);
      await act(async () => {});
      expect(mockedPreload).toHaveBeenCalledTimes(1);
      expect(mockedPreload.mock.calls[0][0].images).toHaveLength(8);
      expect(iconCount()).toBe(0);

      await act(async () => {
        resolvers.shift()?.();
      });
      expect(mockedPreload).toHaveBeenCalledTimes(2);
      expect(mockedPreload.mock.calls[1][0].images).toHaveLength(4);
      expect(iconCount()).toBe(8);

      await act(async () => {
        resolvers.shift()?.();
      });
      expect(iconCount()).toBe(12);
    });
  });

  describe("with IntersectionObserver", () => {
    it("only loads icons for items that approach the viewport", async () => {
      let observerCallback: IntersectionObserverCallback | null = null;
      (global as any).IntersectionObserver = class {
        constructor(callback: IntersectionObserverCallback) {
          observerCallback = callback;
        }

        observe() {}

        unobserve() {}

        disconnect() {}
      };
      const { container } = renderPortfolio(5);
      expect(mockedPreload).not.toHaveBeenCalled();

      const items = container.querySelectorAll(
        '[data-testid="portfolio-item-link"]',
      );
      await act(async () => {
        observerCallback?.(
          [
            { isIntersecting: true, target: items[1] },
            { isIntersecting: true, target: items[3] },
          ] as IntersectionObserverEntry[],
          {} as IntersectionObserver,
        );
      });
      expect(mockedPreload).toHaveBeenCalledTimes(1);
      expect(mockedPreload.mock.calls[0][0].images).toEqual([
        "test_img/1/25.png",
        "test_img/3/25.png",
      ]);

      await act(async () => {
        resolvers.shift()?.();
      });
      expect(iconCount()).toBe(2);
      expect(screen.getByText("Project 1")).toBeInTheDocument();
    });
  });
});
