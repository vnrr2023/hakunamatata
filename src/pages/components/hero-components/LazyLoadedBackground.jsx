import React, { lazy, Suspense } from "react";

const ShootingStars = lazy(() => import("../../../components/ui/shooting-stars").then(module => ({ default: module.ShootingStars })));
const StarsBackground = lazy(() => import("../../../components/ui/stars-background").then(module => ({ default: module.StarsBackground })));
const Spotlight = lazy(() => import("../../../components/ui/Spotlight").then(module => ({ default: module.Spotlight })));

const LazyLoadedBackground = () => (
  <Suspense fallback={<div className="bg-black" />}>
    <div className="absolute inset-0 z-0">
      <Spotlight
        className="-top-40 left-0 md:left-80 md:-top-20"
        fill="gray"
      />
      <ShootingStars />
      <StarsBackground />
    </div>
  </Suspense>
);

export default LazyLoadedBackground;