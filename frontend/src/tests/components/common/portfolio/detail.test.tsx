import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PortfolioDetail } from '../../../../components/common/portfolio/detail';

jest.mock('../../../../components/common/image/preload', () => ({
  ...jest.requireActual('../../../../components/common/image/preload'),
  __esModule: true,
  default: jest.fn(args => {
    args.setIsPreloaded(true);
  }),
}));


describe('PortfolioDetail', () => {
  describe('when given an invalid project key', () => {
    it('renders a nice not found message', async () => {
      await act(async () => render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/project/art.something_bogus']}>
            <Routes>
              <Route path="/project/:projectKey" element={<PortfolioDetail />} />
            </Routes>
          </MemoryRouter>
        </HelmetProvider>,
      ));
      expect(screen.getByText('Not Found')).toBeInTheDocument();
    });
  });

  describe('when given an invalid project category', () => {
    it('renders a nice not found message', async () => {
      await act(async () => render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/project/bonk.dolores_bench']}>
            <Routes>
              <Route path="/project/:projectKey" element={<PortfolioDetail />} />
            </Routes>
          </MemoryRouter>
        </HelmetProvider>,
      ));
      expect(screen.getByText('Not Found')).toBeInTheDocument();
    });
  });

  describe('when given a valid project', () => {
    it('locates and renders the project', async () => {
      await act(async () => render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/project/art.dolores_bench']}>
            <Routes>
              <Route path="/project/:projectKey" element={<PortfolioDetail />} />
            </Routes>
          </MemoryRouter>
        </HelmetProvider>,
      ));
      expect(screen.getByText('Dolores Bench')).toBeInTheDocument();
      expect(screen.getByText('2024-07-24')).toBeInTheDocument();
      expect(screen.getByText('pastel + sharpie')).toBeInTheDocument();
      expect(screen.getByText('A special place.')).toBeInTheDocument();
    });

    describe('with one image', () => {
      it('renders a simple img', async () => {
        await act(async () => render(
          <HelmetProvider>
            <MemoryRouter initialEntries={['/project/code.ttam-fox']}>
              <Routes>
                <Route path="/project/:projectKey" element={<PortfolioDetail />} />
              </Routes>
            </MemoryRouter>
          </HelmetProvider>,
        ));
        expect(screen.getByTestId('portfolio-detail-img')).toBeInTheDocument();
        expect(screen.queryByTestId('carousel-main-image')).toBeNull();
        expect(screen.queryByTestId('portfolio-detail-vid')).toBeNull();
      });
    });

    describe('with multiple images', () => {
      it('renders a carousel', async () => {
        await act(async () => render(
          <HelmetProvider>
            <MemoryRouter initialEntries={['/project/art.shop_class_shelf']}>
              <Routes>
                <Route path="/project/:projectKey" element={<PortfolioDetail />} />
              </Routes>
            </MemoryRouter>
          </HelmetProvider>,
        ));
        expect(screen.queryByTestId('portfolio-detail-img')).toBeNull();
        expect(screen.getByTestId('carousel-main-image')).toBeInTheDocument();
        expect(screen.queryByTestId('portfolio-detail-vid')).toBeNull();
      });
    });

    describe('with a video', () => {
      describe('that has a standard aspect ratio', () => {
        it('renders a 16-9 video player', async () => {
          await act(async () => render(
            <HelmetProvider>
              <MemoryRouter initialEntries={['/project/art.three-cities']}>
                <Routes>
                  <Route path="/project/:projectKey" element={<PortfolioDetail />} />
                </Routes>
              </MemoryRouter>
            </HelmetProvider>,
          ));
          expect(screen.queryByTestId('portfolio-detail-img')).toBeNull();
          expect(screen.queryByTestId('carousel-main-image')).toBeNull();
          expect(screen.getByTestId('portfolio-detail-vid')).toHaveAttribute(
            'class',
            'portfolio-detail-media-vid-16-9',
          );
        });
      });

      describe('that has a non-standard aspect-ratio', () => {
        it('honors it', async () => {
          await act(async () => render(
            <HelmetProvider>
              <MemoryRouter initialEntries={['/project/art.artists-in-residence']}>
                <Routes>
                  <Route path="/project/:projectKey" element={<PortfolioDetail />} />
                </Routes>
              </MemoryRouter>
            </HelmetProvider>,
          ));
          expect(screen.queryByTestId('portfolio-detail-img')).toBeNull();
          expect(screen.queryByTestId('carousel-main-image')).toBeNull();
          expect(screen.getByTestId('portfolio-detail-vid')).toHaveAttribute(
            'class',
            'portfolio-detail-media-vid-4-3',
          );
        });
      });
    });
  });
});
