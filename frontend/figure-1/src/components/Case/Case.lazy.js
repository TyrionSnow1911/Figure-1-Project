import React, { lazy, Suspense } from "react";

const LazyUser = lazy(() => import("./Case"));

const Case = (props) => (
  <Suspense fallback={null}>
    <LazyUser {...props} />
  </Suspense>
);

export default Case;
