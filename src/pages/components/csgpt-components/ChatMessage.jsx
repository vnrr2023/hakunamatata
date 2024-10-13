import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import { Copy, Volume2, ThumbsUp, ThumbsDown } from "lucide-react"

const ChatMessage = ({ message, handleCopy, handleSpeak, isLoading, handleFeedback }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [feedbackGiven, setFeedbackGiven] = useState(false)

  const toggleSpeak = () => {
    if (isSpeaking) {
      handleSpeak(null)
      setIsSpeaking(false)
    } else {
      handleSpeak(message.content)
      setIsSpeaking(true)
    }
  }

  return (
    <div className={`flex items-start ${message.type === "user" ? "justify-end" : "justify-start"}`}>
      {message.type === "ai" && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-transparent flex items-center justify-center mr-2">
          <img src="/logo.png" alt="CSGPT Logo" width={32} height={32} />
        </div>
      )}
      <div className={`max-w-[85%] text-white ${message.type === "user" ? "text-right" : "text-left"}`}>
        {message.type === "ai" ? (
          <>
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-2" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2" {...props} />,
                code: ({ node, inline, ...props }) => 
                  inline ? (
                    <code className="bg-gray-800 rounded px-1" {...props} />
                  ) : (
                    <pre className="bg-gray-800 rounded p-2 overflow-x-auto">
                      <code {...props} />
                    </pre>
                  ),
              }}
            >
              {message.content}
            </ReactMarkdown>
            <div className="flex items-center mt-2">
              <button
                onClick={toggleSpeak}
                className="text-gray-400 hover:text-white transition-colors duration-200 opacity-70 text-sm flex items-center mr-4"
                title={isSpeaking ? "Stop reading" : "Read aloud"}
                disabled={isLoading}
              >
                <Volume2 size={14} className="mr-1" />
                {isSpeaking ? "Stop" : "Read aloud"}
              </button>
              {feedbackGiven ? (
                <span className="text-green-500 text-sm">Thank you for your feedback!</span>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleFeedback(1)
                      setFeedbackGiven(true)
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200 opacity-70 text-sm flex items-center mr-2"
                    title="Like"
                    disabled={feedbackGiven}
                  >
                    <ThumbsUp size={14} className="mr-1" />
                  </button>
                  <button
                    onClick={() => {
                      handleFeedback(0)
                      setFeedbackGiven(true)
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200 opacity-70 text-sm flex items-center"
                    title="Dislike"
                    disabled={feedbackGiven}
                  >
                    <ThumbsDown size={14} className="mr-1" />
                  </button>
                </>
              )}
            </div>
          </>
        ) : message.type === "error" ? (
          <>
            <span className="text-red-500">{message.content}</span>
            <button
              onClick={() => handleSpeak(message.content)}
              className="mt-2 text-gray-400 hover:text-white transition-colors duration-200 opacity-70 text-sm flex items-center"
              title="Read aloud"
              disabled={isLoading}
            >
              <Volume2 size={14} className="mr-1" />
              Read aloud
            </button>
          </>
        ) : (
          message.content
        )}
      </div>
      <button
        onClick={() => handleCopy(message.content)}
        className="ml-2 text-gray-400 hover:text-white transition-colors duration-200"
        title="Copy to clipboard"
      >
        <Copy size={16} />
      </button>
    </div>
  )
}

export default ChatMessage