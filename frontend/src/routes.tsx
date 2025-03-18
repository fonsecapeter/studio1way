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
const LoadableCeramicsDepartment = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/ceramics/department"
    ),
);
const LoadableCeramicsLanding = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./components/ceramics/landing"
    ),
);
const LoadableCeramicsProjects = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/ceramics/projects"
    ),
);
const LoadablePaintProjects = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/paint/projects"
    ),
);
const LoadableWoodProjects = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/wood/projects"
    ),
);
const LoadableOtherProjects = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "./containers/other/projects"
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
          <Route path="/ceramics" element={<LoadableCeramicsDepartment />}>
            <Route index element={<LoadableCeramicsLanding />} />
            <Route path="projects" element={<LoadableCeramicsProjects />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/paint" element={<LoadablePaintProjects />} />
          <Route path="/wood" element={<LoadableWoodProjects />} />
          <Route path="/other" element={<LoadableOtherProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </OhNoErrorBoundary>
  );
};

export default AppRoutes;
