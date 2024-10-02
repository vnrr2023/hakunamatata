import { useState, useRef, useEffect } from "react"
import { ShootingStars } from "../components/ui/shooting-stars"
import { StarsBackground } from "../components/ui/stars-background"
import ReactMarkdown from 'react-markdown'
import { Cover } from "../components/ui/cover"
import { Link } from "react-router-dom"
import { ChevronDown, Download, Trash2, Send } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { pdf, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
})

const styles = StyleSheet.create({
  page: { 
    padding: 30,
    backgroundColor: '#f0f8ff',
    fontFamily: 'Roboto',
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#333',
  },
  questionAnswer: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  question: { 
    fontSize: 14, 
    marginTop: 10, 
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  answer: { 
    fontSize: 12, 
    color: '#333',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#888',
    fontSize: 10,
  },
})

export default function Csgpt() {
  const [userQuery, setUserQuery] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [showScrollDown, setShowScrollDown] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  const textareaRef = useRef(null)

  const suggestions = [
    "What is DNS? with text diagram.",
    "What is computer science?",
    "Explain data link layer",
    "Explain OSI Layers"
  ]
  const router = useNavigate()
  
  useEffect(() => {
    const user = localStorage.getItem("Token")
    if (!user) {
      router("/signup")
    }
    
    const storedMessages = sessionStorage.getItem('chatHistory')
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages)
      setMessages(parsedMessages)
      setShowSuggestions(parsedMessages.length === 0)
    }
  }, [router])
  
  useEffect(() => {
    sessionStorage.setItem('chatHistory', JSON.stringify(messages))
    setShowSuggestions(messages.length === 0)
  }, [messages])

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
    setShowSuggestions(false)
    const token = sessionStorage.getItem("Token")
  
    try {
      const response = await fetch(`${google_ngrok_url}/app/query/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          "question": userQuery
        }),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      
      if (data.server_status && data.data) {
        setMessages(prevMessages => [...prevMessages, { type: "ai", content: data.data }])
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error:", error)
      let errorMessage = "Sorry, there was an error processing your request."
      setMessages((prevMessages) => [...prevMessages, { type: "error", content: errorMessage }])
    } finally {
      setIsLoading(false)
      setUserQuery("")
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
  
    const history = messages.reduce((acc, message, index, array) => {
      if (message.type === "user") {
        acc.push({
          question: message.content,
          answer: array[index + 1]?.content || ""
        })
      }
      return acc
    }, [])
  
    const MyDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>CSGPT Chat History</Text>
          {history.map((item, index) => (
            <View key={index} style={styles.questionAnswer}>
              <Text style={styles.question}>Q: {item.question}</Text>
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>A: {item.answer}</Text>
              </View>
            </View>
          ))}
          <Text style={styles.footer}>This response is generated by CSGPT</Text>
        </Page>
      </Document>
    )
  
    try {
      const blob = await pdf(<MyDocument />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'csgpt-chat-history.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }
  const handleClearChat = () => {
    setMessages([])
    sessionStorage.removeItem('chatHistory')
    setShowSuggestions(true)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800 flex flex-col">
      <div className="absolute inset-0 z-0">
        <ShootingStars />
        <StarsBackground />
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col h-screen">
        <div className="flex justify-between items-center p-4">
            <Link to="/">
          <Cover>
              <span className="font-bold text-gray-400">CS</span>
              <span className="font-bold text-gray-600">GPT</span>
          </Cover>
            </Link>
          {messages.length > 0 && (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200 ease-in-out"
            >
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? 'Downloading...' : 'Save as PDF'}
            </button>
          )}
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
            {showSuggestions && (
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
            <div className="relative w-full flex items-center">
              <div className="absolute left-2 flex space-x-2">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  title="Clear chat"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                ref={textareaRef}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full p-3 pl-12 pr-12 rounded-md text-white bg-transparent border border-white border-opacity-30 focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50 resize-none overflow-hidden"
                placeholder="Ask me anything..."
                rows={1}
              />
              <button
                type="submit"
                className="absolute right-3 text-white p-1 rounded-md focus:outline-none hover:text-gray-300 transition-colors duration-200"
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </div>
            <span className="text-gray-400 mt-2 text-center">CSGPT can only give answers from relevant books.</span>
          </form>
        </div>
      </div>
    </div>
  )
}