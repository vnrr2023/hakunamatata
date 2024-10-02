import { useState, useRef, useEffect } from "react"
import { ShootingStars } from "../components/ui/shooting-stars"
import { StarsBackground } from "../components/ui/stars-background"
import ReactMarkdown from 'react-markdown'
import { Cover } from "../components/ui/cover"
import { Link } from "react-router-dom"
import { ChevronDown, Download, Trash2, Send, Copy, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { pdf, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { google_ngrok_url } from "./SignUp"

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
  answer: { 
    fontSize: 12, 
    color: '#333',
    marginTop: 5,
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

const Header = ({ messages, handleDownload, isDownloading }) => (
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
)

const ChatMessage = ({ message, handleCopy }) => (
  <div className={`flex items-start ${message.type === "user" ? "justify-end" : "justify-start"}`}>
    {message.type === "ai" && (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-transparent flex items-center justify-center mr-2">
        <img src="/logo.png" alt="CSGPT Logo" width={32} height={32} />
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
    <button
      onClick={() => handleCopy(message.content)}
      className="ml-2 text-gray-400 hover:text-white transition-colors duration-200"
      title="Copy to clipboard"
    >
      <Copy size={16} />
    </button>
  </div>
)

const ChatInput = ({ userQuery, setUserQuery, handleSubmit, handleClearChat, lineCount, isLoading, isMobile }) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const newHeight = Math.min(textareaRef.current.scrollHeight, window.innerHeight / 4)
      textareaRef.current.style.height = `${newHeight}px`
      
      // Focus the textarea
      textareaRef.current.focus()
    }
  }, [userQuery])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmitAndClear(event)
    }
  }

  const handleSubmitAndClear = (event) => {
    event.preventDefault()
    handleSubmit(event)
    setUserQuery('')  // Clear the textarea immediately after submission
  }

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-3 pb-12 rounded-md text-white bg-transparent border border-white border-opacity-30 focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50 resize-none overflow-y-auto scrollbar-hide"
        placeholder="Ask me anything..."
        rows={1}
        style={{
          maxHeight: 'calc(50vh - 40px)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      />
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-neutral-800 p-2 rounded-md">
        <button
          type="button"
          onClick={handleClearChat}
          className="text-gray-400 hover:text-white transition-colors duration-200"
          title="Clear chat"
        >
          <Trash2 size={20} />
        </button>
        <span className={`text-sm ${lineCount > 100 ? 'text-red-500' : 'text-gray-400'}`}>
          {lineCount}/100
        </span>
        <button
          type="submit"
          className="text-white p-1 rounded-md focus:outline-none hover:text-gray-300 transition-colors duration-200"
          disabled={isLoading}
          onClick={handleSubmitAndClear}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}
const Suggestions = ({ suggestions, setUserQuery }) => {
  const handleSuggestionClick = (suggestion) => {
    setUserQuery(suggestion)
    document.activeElement.blur()
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4 w-full">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="bg-gray-700 bg-opacity-50 text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-75 transition-colors focus:outline-none"
          onClick={() => handleSuggestionClick(suggestion)}
          type="button"
          tabIndex="-1" // Prevent the button from receiving focus
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}
const PopupWarning = ({ showPopup, setShowPopup }) => (
  showPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex items-center mb-4">
          <AlertCircle className="text-red-500 mr-2" size={24} />
          <h2 className="text-xl font-bold">Too Many Lines</h2>
        </div>
        <p className="mb-4">Your message exceeds 100 lines. Please shorten it before sending.</p>
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

export default function Csgpt() {
  const [userQuery, setUserQuery] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [showScrollDown, setShowScrollDown] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [lineCount, setLineCount] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  const suggestions = [
    "Explain DNS with text diagram.",
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
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [router])
  
  useEffect(() => {
    setShowSuggestions(messages.length === 0)
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    const lines = userQuery.split('\n')
    setLineCount(lines.length)
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
    
    if (lineCount > 100) {
      setShowPopup(true)
      return
    }
  
    const currentQuery = userQuery
    setMessages((prevMessages) => [...prevMessages, { type: "user", content: currentQuery }])
    setIsLoading(true)
    setShowSuggestions(false)
    const token = localStorage.getItem("Token")
  
    try {
      const response = await fetch(`${google_ngrok_url}/app/query/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          "question": currentQuery
        }),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
  
      if (!data || typeof data !== 'object') {
        throw new Error("Invalid response format: Response is not an object")
      }
  
      if (!data.hasOwnProperty('server_status') || !data.hasOwnProperty('data')) {
        throw new Error("Invalid response format: Missing required fields")
      }
  
      if (data.server_status && typeof data.data === 'string') {
        const words = data.data.split(' ')
        let aiResponse = ""
        setMessages(prevMessages => [...prevMessages, { type: "ai", content: aiResponse }])
  
        for (let i = 0; i < words.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 50)) // Delay between words
          aiResponse += words[i] + ' '
          setMessages(prevMessages => {
            const newMessages = [...prevMessages]
            newMessages[newMessages.length - 1] = { type: "ai", content: aiResponse.trim() }
            return newMessages
          })
        }
      } else {
        throw new Error("Invalid response format: Unexpected data structure")
      }
    } catch (error) {
      console.error("Error:", error)
      let errorMessage = `Sorry, there was an error processing your request: ${error.message}`
      setMessages((prevMessages) => [...prevMessages, { type: "error", content: errorMessage }])
    } finally {
      setIsLoading(false)
      setUserQuery("")
      setLineCount(0)
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
              <Text style={styles.answer}>
                A: {convertMarkdownToPlainText(item.answer)}
              </Text>
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
    setShowSuggestions(true)
    setUserQuery("")
    setLineCount(0)
  }

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        console.log('Content copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }

  const convertMarkdownToPlainText = (markdown) => {
    let text = markdown.replace(/#{1,6}\s?/g, '')
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2')
    text = text.replace(/(\*|_)(.*?)\1/g, '$2')
    text = text.replace(/\[([^\]]+)\]$$([^$$]+)\)/g, '$1 ($2)')
    text = text.replace(/```[\s\S]*?```/g, (match) => {
      return match.replace(/```/g, '').trim()
    })
    text = text.replace(/`([^`]+)`/g, '$1')
    text = text.replace(/^\s*[-*+]\s+/gm, '• ')
    text = text.replace(/^\s*\d+\.\s+/gm, (match, offset) => {
      const num = parseInt(match)
      return isNaN(num) ? match : `${num}. `
    })
    return text.trim()
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800 flex flex-col">
      <div className="absolute inset-0 z-0">
        <ShootingStars />
        <StarsBackground />
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col h-screen">
        <Header messages={messages} handleDownload={handleDownload} isDownloading={isDownloading} />

        <div className="flex-grow overflow-hidden flex flex-col">
          <div 
            ref={chatContainerRef} 
            className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} handleCopy={handleCopy} />
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
            className="absolute right-6 bottom-40 bg-gray-700 bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75 transition-colors"
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
              <Suggestions suggestions={suggestions} setUserQuery={setUserQuery} />
            )}
            <ChatInput 
              userQuery={userQuery}
              setUserQuery={setUserQuery}
              handleSubmit={handleSubmit}
              handleClearChat={handleClearChat}
              lineCount={lineCount}
              isLoading={isLoading}
              isMobile={isMobile}
            />
            <span className="text-gray-400 mt-2 text-center">CSGPT can only give answers from relevant books.</span>
          </form>
        </div>
      </div>

      <PopupWarning showPopup={showPopup} setShowPopup={setShowPopup} />
    </div>
  )
}