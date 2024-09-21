import React from "react"
import { ShootingStars } from "../components/ui/shooting-stars"
import { StarsBackground } from "../components/ui/stars-background"
import { Spotlight } from "../components/ui/Spotlight"
import { TextHoverEffect } from "../components/ui/text-hover-effect"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <div className="pt-[50px] relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800">
      <div className="absolute inset-0 z-0">
        <Spotlight
          className="-top-40 left-0 md:left-80 md:-top-20"
          fill="gray"
        />
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <img
          src="./logo.png"
          alt="CSGPT Logo"
          width={200}
          height={200}
          className="mt-4 mb-4"
        />
        <div className="h-[12rem] lg:h-[24rem] flex items-center justify-center">
          <TextHoverEffect text="CSGPT" />
        </div>
        <p className="mb-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
          Search for anything
        </p>
        <button className="inline-flex h-12 p-2 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <Link to="/csgpt">Get Started</Link>
        </button>

        <section className="relative z-10 py-12 px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">Key Features</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-neutral-800 bg-opacity-50 p-6 shadow-lg transition-all hover:bg-opacity-70 hover:shadow-xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-300">Advanced Search</h3>
              <p className="text-gray-400">Powerful search capabilities to find exactly what you need</p>
            </div>
            <div className="rounded-lg bg-neutral-800 bg-opacity-50 p-6 shadow-lg transition-all hover:bg-opacity-70 hover:shadow-xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-300">AI-Powered</h3>
              <p className="text-gray-400">Leveraging cutting-edge AI technology for intelligent results</p>
            </div>
            <div className="rounded-lg bg-neutral-800 bg-opacity-50 p-6 shadow-lg transition-all hover:bg-opacity-70 hover:shadow-xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-300">User-Friendly</h3>
              <p className="text-gray-400">Intuitive interface designed for ease of use</p>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12 px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">About CSGPT</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            CSGPT is a revolutionary search platform that combines the power of AI with
            comprehensive data analysis to provide you with the most accurate and relevant
            search results. Our mission is to make information accessible and useful for everyone.
          </p>
        </section>
        
        <section className="relative z-10 py-12 px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">Ready to Get Started?</h2>
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <Link to="/csgpt">Try CSGPT Now</Link>
          </button>
        </section>
      </div>
    </div>
  )
}