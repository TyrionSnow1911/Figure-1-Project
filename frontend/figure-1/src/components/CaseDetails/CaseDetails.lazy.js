import React, { lazy, Suspense } from "react";

const LazyCaseDetails = lazy(() => import("./CaseDetails"));

const CaseDetails = (props) => (
  <Suspense fallback={null}>
    <LazyCaseDetails {...props} />
  </Suspense>
);

export default CaseDetails;
