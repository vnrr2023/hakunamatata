import React from 'react'
import { Link } from 'react-router-dom' 

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <nav className="flex flex-wrap justify-center sm:justify-start gap-6 mb-4 sm:mb-0">
            
            <Link to="/csgpt" className="hover:text-gray-800 transition-colors">
              CSGPT
            </Link>
          </nav>
          <p className="text-sm text-center sm:text-right">
            &copy; {new Date().getFullYear()} CSGPT AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}