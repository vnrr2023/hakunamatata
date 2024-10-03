import { useEffect } from 'react'
import { IconBrandGoogle } from "@tabler/icons-react"
import { ShootingStars } from "../components/ui/shooting-stars"
import { StarsBackground } from "../components/ui/stars-background"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
export const google_ngrok_url = "https://75a6-2401-4900-56ea-2c2d-942e-dbcc-d508-677c.ngrok-free.app"

export default function SignUp() {
  const navigate = useNavigate()
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_KEY,
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    )
  }, [])

  const handleCallbackResponse = (response) => {
    const formData = new FormData()
    formData.append("token", response.credential)
    fetch(`${google_ngrok_url}/app/auth/login/`, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("Token", data.access)
        
        const user = localStorage.getItem("Token");
        if (user) {
          navigate("/csgpt") 
        }

      })
      .catch(err => console.error("Error in Google login: ", err))
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
              <div id="googleSignInDiv" className="flex justify-center">
                <button
                  type="button"
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  <IconBrandGoogle className="h-6 w-6 mr-2" />
                  Sign in with Google
                </button>
              </div>
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
