import React from "react"

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
          tabIndex="-1"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}

export default Suggestions