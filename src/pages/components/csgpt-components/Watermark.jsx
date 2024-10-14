import React from 'react'
import { Link } from 'react-router-dom'
import { LogIn } from 'lucide-react'

const Watermark = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-gray-500 text-opacity-70 text-center max-w-2xl">
        <p className="text-2xl font-bold mb-2">CSGPT only gives answers from these subjects!</p>
        <Link to="/subjects" className="flex flex-rows justify-center p-2 text-xl underline hover:text-gray-400 transition-colors duration-200 pointer-events-auto">
        View Supported Subjects <LogIn></LogIn>
        </Link>
      </div>
    </div>
  )
}

export default Watermark