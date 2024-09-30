import React, { useState } from "react";
import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from "../components/ui/stars-background";
import { Spotlight } from "../components/ui/Spotlight";
import { TextHoverEffect } from "../components/ui/text-hover-effect";
import { Link } from "react-router-dom";
import { FaStar, FaSearch, FaRobot, FaUser } from 'react-icons/fa';

export default function Hero() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your server
    console.log({ name, email, feedback, rating });
    // Reset form
    setName("");
    setEmail("");
    setFeedback("");
    setRating(0);
    alert("Thank you for your feedback!");
  };

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
          Search for anything with the power of AI
        </p>
        <button className="inline-flex h-12 p-2 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:bg-slate-800">
          <Link to="/csgpt">Get Started</Link>
        </button>

        <section className="relative z-10 py-16 px-4 text-center">
          <h2 className="mb-10 text-4xl font-bold text-white">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: <FaSearch className="text-4xl mb-4 text-blue-400" />, title: "Advanced Search", description: "Powerful search capabilities to find exactly what you need" },
              { icon: <FaRobot className="text-4xl mb-4 text-green-400" />, title: "AI-Powered", description: "Leveraging cutting-edge AI technology for intelligent results" },
              { icon: <FaUser className="text-4xl mb-4 text-purple-400" />, title: "User-Friendly", description: "Intuitive interface designed for ease of use" }
            ].map((feature, index) => (
              <div key={index} className="rounded-lg bg-neutral-800 bg-opacity-50 p-8 shadow-lg transition-all hover:bg-opacity-70 hover:shadow-xl transform hover:-translate-y-1">
                {feature.icon}
                <h3 className="mb-3 text-2xl font-semibold text-gray-300">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 py-16 px-4 text-center bg-neutral-900 bg-opacity-50 rounded-lg shadow-2xl max-w-4xl mx-auto">
          <h2 className="mb-6 text-4xl font-bold text-white">About CSGPT</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 leading-relaxed">
            CSGPT is a revolutionary search platform that combines the power of AI with
            comprehensive data analysis to provide you with the most accurate and relevant
            search results. Our mission is to make information accessible and useful for everyone,
            transforming the way you interact with data.
          </p>
        </section>
        
        <section className="relative z-10 py-16 px-4 text-center">
          <h2 className="mb-10 text-4xl font-bold text-white">User Feedback</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Alex", comment: "CSGPT has revolutionized the way I search for information. It's incredibly accurate and fast!", rating: 5 },
              { name: "Sarah", comment: "The AI-powered results are mind-blowing. It's like having a personal research assistant.", rating: 5 },
              { name: "Michael", comment: "User-friendly interface and powerful search capabilities. Highly recommended!", rating: 4 }
            ].map((feedback, index) => (
              <div key={index} className="rounded-lg bg-neutral-800 bg-opacity-50 p-6 shadow-lg transition-all hover:bg-opacity-70 hover:shadow-xl">
                <p className="text-gray-300 mb-4">"{feedback.comment}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{feedback.name}</span>
                  <div className="flex">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="relative z-10 py-16 px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-gray-300">Join thousands of satisfied users and experience the future of search technology.</p>
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:bg-slate-800 text-lg">
            <Link to="/csgpt">Try CSGPT Now</Link>
          </button>
        </section>

        <section className="relative z-10 py-16 px-4 text-center max-w-2xl mx-auto">
          <h2 className="mb-6 text-4xl font-bold text-white">Leave Your Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 rounded-md bg-neutral-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 rounded-md bg-neutral-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="feedback" className="sr-only">Feedback</label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your Feedback"
                required
                rows={4}
                className="w-full px-4 py-2 rounded-md bg-neutral-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-left text-gray-300 mb-2">Rating</label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors duration-300"
            >
              Submit Feedback
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}