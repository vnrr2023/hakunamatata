import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { google_ngrok_url } from "../../SignUp"
import Header from "./Header"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import Suggestions from "./Suggestions"
import PopupWarning from "./PopupWarning"
// import ShareOptions from "./ShareOptions"
// import { generatePDF } from "./pdfGenerator"

export default function Csgpt() {
  const [userQuery, setUserQuery] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [showScrollDown, setShowScrollDown] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [lineCount, setLineCount] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  // const [pdfBlob, setPdfBlob] = useState(null)
  // const [pdfError, setPdfError] = useState(null)
  // const [showSharingOptions, setShowSharingOptions] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState(null)
  const [voices, setVoices] = useState([])
  const [currentlySpeaking, setCurrentlySpeaking] = useState(null)

  const suggestions = [
    "Explain DNS with text diagram.",
    "What is computer science?",
    "Explain data link layer",
    "Explain OSI Layers"
  ]
  const navigate = useNavigate()
  
  useEffect(() => {
    const user = localStorage.getItem("Token")
    if (!user) {
      navigate("/signup")
    }
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [navigate])
  
  useEffect(() => {
    setShowSuggestions(messages.length === 0)
  }, [messages])

  useEffect(() => {
    const synth = window.speechSynthesis
    
    setSpeechSynthesis(synth)

    const loadVoices = () => {
      const availableVoices = synth.getVoices()
      setVoices(availableVoices)
    }

    loadVoices()
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices
    }
  }, [])

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
    setUserQuery("")
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
  
      if (data.server_status === true) {
        if (typeof data.data === 'string') {
          const words = data.data.split(' ')
          let aiResponse = ""
          setMessages(prevMessages => [...prevMessages, { type: "ai", content: aiResponse }])
  
          for (let i = 0; i < words.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 50))
            aiResponse += words[i] + ' '
            setMessages(prevMessages => {
              const newMessages = [...prevMessages]
              newMessages[newMessages.length - 1] = { type: "ai", content: aiResponse.trim() }
              return newMessages
            })
          }
        } else {
          throw new Error("Invalid response format: 'data' field is not a string")
        }
      } else if (data.server_status === false) {
        throw new Error(`Server error: ${data.data}`)
      } else {
        throw new Error("Invalid response format: Unexpected server_status value")
      }
    } catch (error) {
      console.error("Error:", error)
      let errorMessage = `Sorry, there was an error processing your request: ${error.message}`
      setMessages((prevMessages) => [...prevMessages, { type: "error", content: errorMessage }])
    } finally {
      setIsLoading(false)
      setLineCount(0)
    }
  }

  // const handleShare = async () => {
  //   setPdfError(null)
  //   try {
  //     const blob = await generatePDF(messages)
  //     setPdfBlob(blob)
  //     setShowSharingOptions(true)
  //   } catch (error) {
  //     console.error("Error generating PDF:", error)
  //     setPdfError("There was an error generating the PDF. Please try again.")
  //   }
  // }

  // const closeSharingOptions = () => {
  //   setShowSharingOptions(false)
  //   setPdfBlob(null)
  //   setPdfError(null)
  // }

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

  const getPreferredVoice = () => {
    const preferredVoices = [
      voices.find(voice => voice.name === "Microsoft Mark - English (United States)"),
      voices.find(voice => voice.name === "Google US English Male"),
      voices.find(voice => voice.lang.startsWith('en') && voice.name.toLowerCase().includes('male')),
      voices.find(voice => voice.lang.startsWith('en')),
      voices[0]
    ]

    return preferredVoices.find(voice => voice !== undefined)
  }

  const handleSpeak = (content) => {
    if (!speechSynthesis) return

    if (currentlySpeaking) {
      speechSynthesis.cancel()
      setCurrentlySpeaking(null)
      return
    }

    if (content) {
      const plainText = content.replace(/```[\s\S]*?```/g, '').replace(/`/g, '')
      const utterance = new SpeechSynthesisUtterance(plainText)

      const preferredVoice = getPreferredVoice()
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      if (isMobile) {
        const mobileVoice = voices.find(voice => 
          voice.name === "Google US English" || 
          voice.name === "Samsung English Female" ||
          voice.lang === "en-US"
        )
        if (mobileVoice) {
          utterance.voice = mobileVoice
        }
      }

      utterance.rate = 0.9
      utterance.pitch = 1

      utterance.onend = () => {
        setCurrentlySpeaking(null)
      }

      setCurrentlySpeaking(content)
      speechSynthesis.speak(utterance)
    }
  }

  const handleFeedback = async (feedback) => {
    const token = localStorage.getItem("Token")
    try {
      const response = await fetch(`${google_ngrok_url}/app/feedback/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          "Response Feedback": feedback
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Feedback sent successfully:", data)
    } catch (error) {
      console.error("Error sending feedback:", error)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800 flex flex-col">
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col h-screen">
        {/* <Header messages={messages} handleShare={handleShare} /> */}
        <Header messages={messages}/>
        <div className="flex-grow overflow-hidden flex flex-col">
          <div 
            ref={chatContainerRef} 
            className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                message={message} 
                handleCopy={handleCopy} 
                handleSpeak={handleSpeak}
                isLoading={isLoading}
                handleFeedback={handleFeedback}
              />
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
        {/* {showSharingOptions && (
          <ShareOptions pdfBlob={pdfBlob} messages={messages} closeSharingOptions={closeSharingOptions} />
        )}
        {pdfError && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-red-500">Error</h2>
              <p className="text-white">{pdfError}</p>
              <button
                onClick={() => setPdfError(null)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )} */}
      </div>

      <PopupWarning showPopup={showPopup} setShowPopup={setShowPopup} />
    </div>
  )
}