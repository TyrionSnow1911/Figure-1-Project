import React, { lazy, Suspense } from 'react';

const LazyUserDetails = lazy(() => import('./UserDetails'));

const UserDetails = props => (
  <Suspense fallback={null}>
    <LazyUserDetails {...props} />
  </Suspense>
);

export default UserDetails;
