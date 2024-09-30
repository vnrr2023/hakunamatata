import { useState, useRef, useEffect } from "react"
import { ShootingStars } from "../components/ui/shooting-stars"
import { StarsBackground } from "../components/ui/stars-background"
import ReactMarkdown from 'react-markdown'
import { Cover } from "../components/ui/cover"
import { Link } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom";
export default function Csgpt() {
  const [userQuery, setUserQuery] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [showScrollDown, setShowScrollDown] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  const textareaRef = useRef(null)

  const suggestions = [
    "What is DBMS?",
    "What is computer science?",
    "Explain data link layer",
    "Explain OSI Layers"
  ]
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem("Token");
    if (!user) {
      navigate("/signup")
    }
  }, [navigate]) 
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [userQuery])

  useEffect(() => {
    const checkScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
        setShowScrollDown(scrollHeight - scrollTop - clientHeight > 20)
      }
    }

    const chatContainer = chatContainerRef.current
    if (chatContainer) {
      chatContainer.addEventListener('scroll', checkScroll)
      return () => chatContainer.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!userQuery.trim()) return

    setMessages((prevMessages) => [...prevMessages, { type: "user", content: userQuery }])
    setIsLoading(true)
    setIsFirstTime(false)

    try {
      const response = await fetch("https://0c29-43-231-238-206.ngrok-free.app/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "question": userQuery }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let aiResponse = ""

      setMessages((prevMessages) => [...prevMessages, { type: "ai", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        aiResponse += chunk

        setMessages((prevMessages) => {
          const newMessages = [...prevMessages]
          newMessages[newMessages.length - 1].content = aiResponse
          return newMessages
        })
      }
    } catch (error) {
      console.error("Error:", error)
      let errorMessage = "Sorry, there was an error processing your request."
      setMessages((prevMessages) => [...prevMessages, { type: "error", content: "" }])
      
      for (let i = 0; i < errorMessage.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50))
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages]
          newMessages[newMessages.length - 1].content = errorMessage.slice(0, i + 1)
          return newMessages
        })
      }
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
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col h-screen">
        <div className="flex justify-between items-center p-4">
          <Cover>
            <Link to="/">
              <span className="font-bold text-gray-400">CS</span>
              <span className="font-bold text-gray-600">GPT</span>
            </Link>
          </Cover>
        </div>

        <div className="flex-grow overflow-hidden flex flex-col">
          <div 
            ref={chatContainerRef} 
            className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
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
                  ) : message.type === "error" ? (
                    <span className="text-red-500">{message.content}</span>
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
        </div>

        {showScrollDown && (
          <button
            onClick={scrollToBottom}
            className="absolute right-6 bottom-28 bg-gray-700 bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75 transition-colors"
          >
            <ChevronDown size={24} />
          </button>
        )}

        <div className="p-4 w-full bg-gradient-to-b from-transparent to-neutral-800">
          <form
            className="flex flex-col items-center w-full max-w-4xl mx-auto"
            onSubmit={handleSubmit}
          >
            {isFirstTime && (
              <div className="flex flex-wrap justify-center gap-2 mb-4 w-full">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="bg-gray-700 bg-opacity-50 text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-75 transition-colors"
                    onClick={() => setUserQuery(suggestion)}
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div className="relative w-full">
              <textarea
                ref={textareaRef}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full p-3 pr-12 rounded-md text-white bg-transparent border border-white border-opacity-30 focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50 resize-none overflow-hidden"
                placeholder="Ask me anything..."
                rows={1}
              />
              <button
                type="submit"
                className="absolute right-3 bottom-3 bg-transparent text-white p-1 rounded-md focus:outline-none"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M13 5.41V21a1 1 0 0 1-2 0V5.41l-5.3 5.3a1 1 0 1 1-1.4-1.42l7-7a1 1 0 0 1 1.4 0l7 7a1 1 0 1 1-1.4 1.42L13 5.41z" />
                </svg>
              </button>
            </div>
            <span className="text-gray-400 mt-2 text-center">CSGPT can only give answers from relevant books.</span>
          </form>
        </div>
      </div>
    </div>
  )
}