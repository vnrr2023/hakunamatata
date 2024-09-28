import { useEffect } from 'react'
import { IconBrandGoogle } from "@tabler/icons-react"
export const google_ngrok_url="https://940a-43-231-238-206.ngrok-free.app" 
export default function SignUp() {
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:import.meta.env.VITE_GOOGLE_KEY,
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )
  }, [])
 
  const handleCallbackResponse = (response) => {
    const formData = new FormData()
    formData.append("token", response.credential)
    console.log(response.credential)
    fetch(`${google_ngrok_url}/auth/google_login/`, {
      method: "POST",
      body: formData,  
    })
      .then(res => res.json())
      .then(data => {
        console.log("Backend response: ", data)
        localStorage.setItem("User", JSON.stringify(data))
      })
      .catch(err => console.error("Error in Google login: ", err))
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-2xl p-8 shadow-lg bg-white dark:bg-gray-800">
      <h2 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-6">
        Sign in with Google
      </h2>
      <div id="signInDiv" className="flex justify-center">
        <button
          className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
          type="button"
        >
          <IconBrandGoogle className="h-5 w-5" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}