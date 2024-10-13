import React from "react"
import { AlertCircle } from "lucide-react"

const PopupWarning = ({ showPopup, setShowPopup }) => (
  showPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="flex items-center mb-4">
          <AlertCircle className="text-red-500 mr-2" size={24} />
          <h2 className="text-xl font-bold text-white">Too Many Lines</h2>
        </div>
        <p className="mb-4 text-gray-300">Your message exceeds 100 lines. Please shorten it before sending.</p>
        <button
          onClick={() => setShowPopup(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  )
)

export default PopupWarning