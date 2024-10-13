import React from "react"
import { Mail, Share2, Download } from "lucide-react"

const ShareOptions = ({ pdfBlob, messages, closeSharingOptions }) => {
  const handleEmailShare = () => {
    const emailBody = messages
      .map(msg => `${msg.type === 'user' ? 'Q' : 'A'}: ${msg.content}`)
      .join('\n\n');
    const emailUrl = `mailto:?subject=CSGPT Chat History&body=${encodeURIComponent(emailBody)}`;
    window.open(emailUrl);
  }

  const handleWhatsAppShare = () => {
    const whatsappText = messages
      .map(msg => `${msg.type === 'user' ? 'Q' : 'A'}: ${msg.content}`)
      .join('\n\n');
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappUrl, '_blank');
  }

  const handleLocalSave = () => {
    const url = URL.createObjectURL(pdfBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'csgpt-chat-history.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    closeSharingOptions()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-white">Share or Save PDF</h2>
        <div className="space-y-4">
          <button
            onClick={handleEmailShare}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
          >
            <Mail className="mr-2" /> Share via Email
          </button>
          <button
            onClick={handleWhatsAppShare}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
          >
            <Share2 className="mr-2" /> Share via WhatsApp
          </button>
          <button
            onClick={handleLocalSave}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          >
            <Download className="mr-2" /> Save Locally
          </button>
        </div>
        <button
          onClick={closeSharingOptions}
          className="mt-4 text-gray-400 hover:text-gray-200 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ShareOptions