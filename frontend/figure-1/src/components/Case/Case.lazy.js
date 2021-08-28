import React, { lazy, Suspense } from "react";

const LazyCase = lazy(() => import("./Case"));

const Case = (props) => (
  <Suspense fallback={null}>
    <LazyCase {...props} />
  </Suspense>
);

export default Case;
