import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import OhNoErrorBoundary from "./components/common/error";
import NotFound from "./components/common/not_found";

const LoadableTheStudio = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/the_studio/index"
    ),
);
const LoadableDepartment = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/common/department"
    ),
);
const LoadableCeramicsPhilosophy = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/ceramics/philosophy"
    ),
);
const LoadableCeramicsProjects = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/ceramics/projects"
    ),
);
const LoadableCeramicWareDetail = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/ceramics/portfolio_detail"
    ),
);
const LoadablePaintPhilosophy = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/paint/philosophy"
    ),
);
const LoadablePaintProjects = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/paint/projects"
    ),
);
const LoadablePaintingDetail = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/paint/portfolio_detail"
    ),
);
const LoadableWoodPhilosophy = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/wood/philosophy"
    ),
);
const LoadableWoodProjects = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/wood/projects"
    ),
);
const LoadableWoodWorkDetail = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/wood/portfolio_detail"
    ),
);
const LoadableOtherPhilosophy = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/other/philosophy"
    ),
);
const LoadableOtherProjects = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/other/projects"
    ),
);
const LoadableOtherProjectDetail = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/other/portfolio_detail"
    ),
);

// Update changes in src/main/java/com/studio1way/studio1way/controller/SPAPathsController.java
const AppRoutes = () => {
  return (
    <OhNoErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<LoadableTheStudio />} />
          <Route path="/the-studio" element={<LoadableTheStudio />} />
          <Route path="/ceramics" element={<LoadableDepartment />}>
            <Route index element={<LoadableCeramicsPhilosophy />} />
            <Route path="projects" element={<LoadableCeramicsProjects />}>
            </Route>
            <Route
              path="project/:projectId"
              element={<LoadableCeramicWareDetail />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/paint" element={<LoadableDepartment />}>
            <Route index element={<LoadablePaintPhilosophy />} />
            <Route path="projects" element={<LoadablePaintProjects />} />
            <Route
              path="project/:projectId"
              element={<LoadablePaintingDetail />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/wood" element={<LoadableDepartment />}>
            <Route index element={<LoadableWoodPhilosophy />} />
            <Route path="projects" element={<LoadableWoodProjects />} />
            <Route
              path="project/:projectId"
              element={<LoadableWoodWorkDetail />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/other" element={<LoadableDepartment />}>
            <Route index element={<LoadableOtherPhilosophy />} />
            <Route path="projects" element={<LoadableOtherProjects />} />
            <Route
              path="project/:projectId"
              element={<LoadableOtherProjectDetail />}
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
