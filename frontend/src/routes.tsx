import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import OhNoErrorBoundary from "./components/common/error";
import NotFound from "./components/common/not_found";

const LoadableStudioPhilosophy = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/philosophy/studio_philosophy"
    ),
);
const LoadableDepartment = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/common/department"
    ),
);
const LoadablePortfolioIndexContainer = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/portfolio/index/projects"
    ),
);
const LoadableCeramicsPhilosophy = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/philosophy/ceramics_philosophy"
    ),
);
const LoadableCeramicsPortfolioIndexContainer = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/portfolio/index/ceramics"
    ),
);
const LoadableCeramicWareProjectDetailContainer = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/portfolio/detail/ceramic_ware"
    ),
);
const LoadablePaintPhilosophy = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/philosophy/paint_philosophy"
    ),
);
const LoadablePaintPortfolioIndexContainer = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/portfolio/index/paint"
    ),
);
const LoadablePaintingProjectDetailContainer = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/portfolio/detail/painting"
    ),
);
const LoadableWoodPhilosophy = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/philosophy/wood_philosophy"
    ),
);
const LoadableWoodPortfolioIndexContainer = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/portfolio/index/wood"
    ),
);
const LoadableWoodWorkProjectDetailContainer = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/portfolio/detail/wood_work"
    ),
);
const LoadableOtherPhilosophy = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/philosophy/other_philosophy"
    ),
);
const LoadableOtherPortfolioIndexContainer = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/portfolio/index/other"
    ),
);
const LoadableOtherProjectDetailContainer = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/portfolio/detail/other_project"
    ),
);

// Update changes in src/main/java/com/studio1way/studio1way/controller/SPAPathsController.java
const AppRoutes = () => {
  return (
    <OhNoErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<LoadableStudioPhilosophy />} />
          <Route path="/the-studio" element={<LoadableStudioPhilosophy />} />
          <Route
            path="/portfolio"
            element={<LoadablePortfolioIndexContainer />}
          />
          <Route path="/ceramics" element={<LoadableDepartment />}>
            <Route index element={<LoadableCeramicsPhilosophy />} />
            <Route
              path="projects"
              element={<LoadableCeramicsPortfolioIndexContainer />}
            ></Route>
            <Route
              path="project/:projectId"
              element={<LoadableCeramicWareProjectDetailContainer />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/paint" element={<LoadableDepartment />}>
            <Route index element={<LoadablePaintPhilosophy />} />
            <Route
              path="projects"
              element={<LoadablePaintPortfolioIndexContainer />}
            />
            <Route
              path="project/:projectId"
              element={<LoadablePaintingProjectDetailContainer />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/wood" element={<LoadableDepartment />}>
            <Route index element={<LoadableWoodPhilosophy />} />
            <Route
              path="projects"
              element={<LoadableWoodPortfolioIndexContainer />}
            />
            <Route
              path="project/:projectId"
              element={<LoadableWoodWorkProjectDetailContainer />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/other" element={<LoadableDepartment />}>
            <Route index element={<LoadableOtherPhilosophy />} />
            <Route
              path="projects"
              element={<LoadableOtherPortfolioIndexContainer />}
            />
            <Route
              path="project/:projectId"
              element={<LoadableOtherProjectDetailContainer />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </OhNoErrorBoundary>
  );
};

export default AppRoutes;
