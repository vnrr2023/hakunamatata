import React from "react";
import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from "../components/ui/stars-background";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800">
      <div className="absolute inset-0 z-0">
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <img
          src="./logo.png"
          alt="CSGPT Logo"
          width={200}
          height={200}
          className="mb-8"
        />
        <h1 className="mb-4 text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl">
          CSGPT
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-gray-300 sm:text-2xl">
          Search for anything
        </p>
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <Link to="/csgpt">Get Started</Link>
        </button>
      </div>
    </div>
  )
}
