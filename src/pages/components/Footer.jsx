import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={onClick}
      >
        <span className="font-medium">{question}</span>
        <span className="transform transition-transform duration-200 ease-in-out">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function Footer() {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      question: "What is CSGPT?",
      answer: "CSGPT is an AI-powered search platform that provides fast, relevant, and accurate answers to your queries across various computer science subjects."
    },
    {
      question: "How does CSGPT work?",
      answer: "CSGPT uses advanced AI algorithms to analyze and understand your questions, then searches through its vast database to provide the most relevant and accurate information."
    },
    {
      question: "Is CSGPT free to use?",
      answer: "CSGPT offers both free and premium plans. The free plan provides access to basic features, while the premium plan offers additional benefits and advanced capabilities."
    },
    {
      question: "Can I use CSGPT for my academic research?",
      answer: "CSGPT is an excellent tool for academic research, providing up-to-date information and insights across various computer science topics."
    }
  ]

  const handleFAQClick = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            <div className="flex flex-col items-start">
              <Link to="/csgpt" className="text-lg font-semibold hover:text-gray-800 transition-colors mb-2">
                CSGPT
              </Link>
              <span className="text-sm">&copy; {new Date().getFullYear()} CSGPT AI. All rights reserved.</span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={index} 
                  question={faq.question} 
                  answer={faq.answer} 
                  isOpen={openFAQ === index}
                  onClick={() => handleFAQClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}