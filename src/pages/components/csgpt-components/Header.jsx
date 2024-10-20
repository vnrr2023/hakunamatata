import React from "react"
import { Link } from "react-router-dom"
import { Share2 } from "lucide-react"
import { Cover } from "../../../components/ui/cover"

const Header = ({ messages, handleShare }) => (
  <div className="flex justify-between items-center p-4">
    <Link to="/">
      <Cover>
        <span className="font-bold text-gray-400">CS</span>
        <span className="font-bold text-gray-600">GPT</span>
      </Cover>
    </Link>
    {messages.length > 0 && (
      <button
        onClick={handleShare}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200 ease-in-out"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </button>
    )}
  </div>
)

export default Header