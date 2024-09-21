import { useState, useRef, useEffect } from "react"
import { ShootingStars } from "../components/ui/shooting-stars"
import { StarsBackground } from "../components/ui/stars-background"
import ReactMarkdown from 'react-markdown'
import { Cover } from "../components/ui/cover"
import { Link } from "react-router-dom"

export default function Csgpt() {
  const [userQuery, setUserQuery] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const messagesEndRef = useRef(null)

  const suggestions = [
    "What is DBMS?",
    "What is computer science?",
    "Explain data structures",
    "Explain OSI Layers"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!userQuery.trim()) return

    setMessages((prevMessages) => [...prevMessages, { type: "user", content: userQuery }])
    setIsLoading(true)
    setIsFirstTime(false)

    try {
      const response = await fetch("https://e113-43-231-238-206.ngrok-free.app/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "question": userQuery }),
      })

      const data = await response.json()
      const aiResponse = data.markdown_data || "No response received"
      setMessages((prevMessages) => [...prevMessages, { type: "ai", content: aiResponse }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prevMessages) => [...prevMessages, { type: "error", content: "Sorry, there was an error processing your request." }])
    } finally {
      setIsLoading(false)
      setUserQuery("")
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800 flex flex-col">
      <div className="absolute inset-0 z-0">
        <ShootingStars />
        <StarsBackground />
        <div className="m-4">
          <Cover>
            <Link to="/">
              <span className="font-bold text-gray-400">CS</span>
              <span className="font-bold text-gray-600">GPT</span>
            </Link>
          </Cover>
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto flex-grow flex flex-col">
        <div className="flex-grow overflow-y-auto p-4 space-y-6 mt-16">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "ai" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-transparent flex items-center justify-center mr-2">
                  <img
                    src="/logo.png"
                    alt="CSGPT Logo"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              <div className={`max-w-[85%] text-white ${message.type === "user" ? "text-right" : "text-left"}`}>
                {message.type === "ai" ? (
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
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={`p-4 w-full ${isFirstTime ? 'mt-auto' : ''}`}>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit}
          >
            {isFirstTime && (
              <div className="flex flex-wrap justify-center gap-2 mb-4 w-full">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition-colors"
                    onClick={() => setUserQuery(suggestion)}
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div className="relative w-full">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full p-3 pr-12 rounded-full text-white bg-transparent border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask me anything..."
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-1 rounded-full focus:outline-none"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M13 5.41V21a1 1 0 0 1-2 0V5.41l-5.3 5.3a1 1 0 1 1-1.4-1.42l7-7a1 1 0 0 1 1.4 0l7 7a1 1 0 1 1-1.4 1.42L13 5.41z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}