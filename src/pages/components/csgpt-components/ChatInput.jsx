import React, { useRef, useEffect } from "react"
import { Trash2, Send } from "lucide-react"

const ChatInput = ({ userQuery, setUserQuery, handleSubmit, handleClearChat, lineCount, isLoading, isMobile }) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const newHeight = Math.min(textareaRef.current.scrollHeight, window.innerHeight / 4)
      textareaRef.current.style.height = `${newHeight}px`
      
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
    setUserQuery('')  
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
        disabled={isLoading}
      />
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-neutral-800 p-2 rounded-md">
        <button
          type="button"
          onClick={handleClearChat}
          className="text-gray-400 hover:text-white transition-colors duration-200"
          title="Clear chat"
        >
          <Trash2  size={20} />
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

export default ChatInput