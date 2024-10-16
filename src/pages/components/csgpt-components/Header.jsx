import React from "react"
import { Link } from "react-router-dom"
import { Share2, FileDown } from "lucide-react"
import { Cover } from "../../../components/ui/cover"
import { generatePDF } from "./pdfGenerator"

const Header = ({ messages }) => {
  const handleGeneratePDF = async () => {
    if (messages.length === 0) {
      alert("No messages to generate PDF from.")
      return
    }

    try {
      const pdfBlob = await generatePDF(messages)
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'chat_history.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("An error occurred while generating the PDF. Please try again.")
    }
  }

  return (
    <div className="flex justify-between items-center p-4">
      <Link to="/">
        <Cover>
          <span className="font-bold text-gray-400">CS</span>
          <span className="font-bold text-gray-600">GPT</span>
        </Cover>
      </Link>
      {messages.length > 0 && (
        <div className="flex space-x-2">
          <button
            onClick={handleGeneratePDF}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200 ease-in-out"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download PDF
          </button>
          {/* Uncomment if you want to include the Share button
          <button
            onClick={handleShare}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200 ease-in-out"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </button>
          */}
        </div>
      )}
    </div>
  )
}

export default Header