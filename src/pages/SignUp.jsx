import React, { useEffect, useState } from 'react'
import { IconBrandGoogle, IconLoader2 } from "@tabler/icons-react"
import { ShootingStars } from "../components/ui/shooting-stars"
import { StarsBackground } from "../components/ui/stars-background"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export const google_ngrok_url = "https://117f-43-231-238-206.ngrok-free.app"


export default function SignUp() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false)

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => setIsGoogleScriptLoaded(true)
      document.body.appendChild(script)
    }

    loadGoogleScript()
  }, [])

  useEffect(() => {
    if (isGoogleScriptLoaded && typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_KEY,
        callback: handleCallbackResponse
      })
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      )
    }
  }, [isGoogleScriptLoaded])

  const handleCallbackResponse = (response) => {
    setIsLoading(true)
    setError(null)
    const formData = new FormData()
    formData.append("token", response.credential)
    
    fetch(`${google_ngrok_url}/app/auth/login/`, {
      method: "POST",
      body: formData,
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Login failed. Please try again.')
        }
        return res.json()
      })
      .then(data => {
        localStorage.setItem("Token", data.access)
        navigate("/csgpt")
      })
      .catch(err => {
        console.error("Error in Google login")
        setError("An unexpected error occurred. Please try again.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const renderGoogleButton = () => {
    if (isLoading) {
      return (
        <button
          type="button"
          className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 cursor-not-allowed"
          disabled
        >
          <IconLoader2 className="h-6 w-6 mr-2 animate-spin" />
          Signing in...
        </button>
      )
    }

    if (!isGoogleScriptLoaded) {
      return (
        <button
          type="button"
          className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          disabled
        >
          <IconBrandGoogle className="h-6 w-6 mr-2" />
          Sign in with Google
        </button>
      )
    }

    return <div id="googleSignInDiv"></div>
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-800">
      <div className="absolute inset-0 z-0">
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome</h2>
                <p className="text-gray-600 dark:text-gray-300">Sign in to your account</p>
              </div>
              <div className="flex justify-center">
                {renderGoogleButton()}
              </div>
              {error && (
                <div className="text-red-500 text-center text-sm">
                  {error}
                </div>
              )}
            </div>
            <div className="px-8 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                By signing in, you agree to our{" "}
                <a href="#" className="underline hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a> and{" "}
                <a href="#" className="underline hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}