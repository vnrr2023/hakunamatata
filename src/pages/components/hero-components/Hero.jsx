import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import LazyLoadedBackground from "./LazyLoadedBackground";
import RevealOnScroll from "./RevealOnScroll";
import Feature from "./Feature";
import Subject from "./Subject";
import Limitation from "./Limitation";
import FeedbackForm from "./FeedbackForm";
import { FaRocket, FaStar, FaSearch, FaRobot, FaUser, FaBolt, FaCode, FaImage, FaBook, FaKeyboard } from 'react-icons/fa';

const TextHoverEffect = lazy(() => import("../../../components/ui/text-hover-effect").then(module => ({ default: module.TextHoverEffect })));

export default function Hero() {

  const subjects = [
    "Information Retrieval",
    "Natural Language Processing",
    "Management Information System",
    "Computer Networks",
    "Software Engineering",
    "Data Warehouse Mining",
    "Internet Of Things",
    "Mobile Computing",
    "Cryptography and System Security",
    "Big data analytics", 
    "Machine learning",
  ];

  const subjectColors = [
    'from-pink-200 to-rose-200',
    'from-purple-200 to-indigo-200',
    'from-blue-200 to-cyan-200',
    'from-teal-200 to-green-200',
    'from-lime-200 to-yellow-200',
    'from-amber-200 to-orange-200',
    'from-red-200 to-pink-200',
    'from-fuchsia-200 to-purple-200',
    'from-violet-200 to-blue-200',
    'from-amber-200 to-orange-200',
    'from-violet-200 to-blue-200'
  ];

  const features = [
    { icon: <FaBolt className="text-4xl mb-4 text-yellow-400" />, title: "Fast Answers", description: "Get instant, low-latency replies to all your Computer Science queries. No waiting—just quick, reliable solutions at your fingertips." },
    { icon: <FaSearch className="text-4xl mb-4 text-blue-400" />, title: "Relevant Results", description: "Receive answers drawn directly from trusted and profound CS books. Stay focused on the right information from credible sources." },
    { icon: <FaRobot className="text-4xl mb-4 text-green-400" />, title: "Accurate Information", description: "Learn with confidence! We provide accurate, precise answers that are designed to help you master even the toughest CS topics." },
    { icon: <FaUser className="text-4xl mb-4 text-purple-400" />, title: "User-Friendly Experience", description: "Seamlessly ask questions and get results with our intuitive interface. Whether you're a student or a professional, CSGPT makes learning easy and enjoyable." }
  ];

  const limitations = [
    { icon: <FaCode className="text-4xl mb-4 text-red-400" />, title: "No Code Generation", description: "While CSGPT excels at providing detailed theoretical answers, it currently cannot generate or debug code." },
    { icon: <FaImage className="text-4xl mb-4 text-orange-400" />, title: "No MultiModal Support", description: "CSGPT does not support images, diagrams, or multimedia inputs—answers are purely text-based." },
    { icon: <FaBook className="text-4xl mb-4 text-indigo-400" />, title: "Limited Subject Range", description: "We specialize in core Computer Science topics and other subjects required by students, thus interdisciplinary subjects may have limited support." },
    { icon: <FaKeyboard className="text-4xl mb-4 text-teal-400" />, title: "Text-Only Input", description: "Our platform currently supports text queries only and does not handle voice or image inputs." }
  ];

  const faqs = [
    {
      question: "What is CSGPT?",
      answer: "CSGPT is an AI-powered platform specifically designed for Computer Science students and professionals. It provides instant, accurate answers to CS-related queries by drawing information from authoritative textbooks."
    },
    {
      question: "How is CSGPT different from other AI chatbots?",
      answer: "Unlike general-purpose AI chatbots, CSGPT focuses exclusively on Computer Science topics. It sources information from verified CS textbooks, ensuring higher accuracy and relevance for CS students and professionals."
    },
    {
      question: "Is CSGPT free to use?",
      answer: "CSGPT offers both free and premium tiers. While basic functionality is available for free, advanced features and increased usage limits may require a subscription."
    },
    {
      question: "Can CSGPT help with coding problems?",
      answer: "While CSGPT can provide explanations and theoretical knowledge about coding concepts, it currently does not generate or debug code. It's best used for understanding CS concepts and theories."
    }
  ];

  return (
    <div className="pt-[50px] relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800">
      <LazyLoadedBackground />
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <RevealOnScroll>
            <img
              src="./logo.png"
              alt="CSGPT Logo"
              width={200}
              height={200}
              className="mb-4"
              loading="lazy"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="h-[12rem] lg:h-[18rem] flex items-center justify-center mb-0">
              <Suspense fallback={<div>Loading...</div>}>
                <TextHoverEffect text="CSGPT" />
              </Suspense>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="space-y-4">
              <p className="max-w-2xl text-lg text-gray-300 sm:text-xl">
                Search for anything with the power of AI
              </p>
              <div>
                <Link to="/csgpt">
                  <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.7)] hover:border-transparent">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <section className="relative z-10 py-16 px-4 text-center bg-gradient-to-br from-black-900 to-black rounded-lg shadow-2xl max-w-6xl mx-auto">
            <h2 className="mb-8 text-4xl font-bold text-white">About CSGPT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-left space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  CSGPT is revolutionizing Computer Science learning by harnessing the power of AI and authoritative CS textbooks. We deliver precise, instant answers to your most challenging CS queries.
                </p>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2 text-white">Our Mission</h3>
                  <p className="text-gray-200">
                    To empower CS students and professionals with instant access to accurate, comprehensive knowledge, accelerating learning and problem-solving in the field of Computer Science.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <FaRocket className="text-3xl text-blue-400" />, title: "Cutting-edge AI", description: "Powered by advanced AI algorithms" },
                  { icon: <FaBook className="text-3xl text-green-400" />, title: "Authoritative Sources", description: "Information from trusted CS textbooks" },
                  { icon: <FaBolt className="text-3xl text-yellow-400" />, title: "Instant Answers", description: "Get responses in seconds, not minutes" },
                  { icon: <FaUser className="text-3xl text-purple-400" />, title: "Learn Faster", description: "Accelerate your CS education" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="flex justify-center mb-2">{item.icon}</div>
                    <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="relative z-10 py-16 px-4 text-center">
            <h2 className="mb-10 text-4xl font-bold text-white">Key Features</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Feature key={index} {...feature} />
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="w-full max-w-4xl mx-auto mt-12 p-6 rounded-lg shadow-lg relative overflow-hidden">
            <div className="mb-12"><h3 className="text-4xl font-bold text-white px-3">SUPPORTED SUBJECTS</h3></div>  
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {subjects.map((subject, index) => (
                <Subject key={index} subject={subject} color={subjectColors[index]} />
              ))}
            </div>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll>
          <section className="relative z-10 py-16 px-4 text-center">
            <h2 className="mb-10 text-4xl font-bold text-white">User Feedback</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Alex", comment: "CSGPT has revolutionized the way I search for information. It's incredibly accurate and fast!", rating: 5 },
                { name: "Sarah", comment: "The AI-powered results are mind-blowing. It's like having a personal research assistant.", rating: 5 },
                { name: "Michael", comment: "User-friendly interface and powerful search capabilities. Highly recommended!", rating: 4 }
              ].map((feedback, index) => (
                <RevealOnScroll key={index} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <div className="rounded-lg bg-neutral-800 bg-opacity-50 p-6 shadow-lg transition-all hover:bg-opacity-70 hover:shadow-xl">
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
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="relative z-10 py-16 px-4 text-center max-w-6xl mx-auto">
            <h2 className="mb-10 text-4xl font-bold text-white">Limitations</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {limitations.map((limitation, index) => (
                <Limitation key={index} {...limitation} />
              ))}
            </div>
          </section>
        </RevealOnScroll>
        
        <RevealOnScroll>
          <section className="relative z-10 py-16 px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold text-white">Ready to Get Started?</h2>
            <p className="mb-8 text-lg text-gray-300">Join thousands of satisfied users and experience the future of search technology.</p>
            <Link to="/csgpt">
              <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.7)] hover:border-transparent">
                TRY CSGPT NOW
              </button>
            </Link>
          </section>
        </RevealOnScroll>

        

        <RevealOnScroll>
          <section className="relative z-10 py-16 px-4 text-center max-w-2xl mx-auto">
            <h2 className="mb-6 text-4xl font-bold text-white">Leave Your Feedback</h2>
            <FeedbackForm />
          </section>
        </RevealOnScroll>
      </div>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: -200% 0%;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  )
}