import React, { useState, useCallback } from "react";
import { FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { google_ngrok_url } from "../../SignUp";

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('0');
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");

    if (!token) {
      alert('Unauthorized. Please sign in.');
      navigate('/signup');
      return;
    }
    if (rating==="1"){
        setRating("5")
    }
    const jsonData = {
      name,
      email,
      stars: rating,
      feedback,
    };

    try {
      const response = await fetch(`${google_ngrok_url}/app/take_review/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': "application/json"
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      console.log(result);
      setName('');
      setEmail('');
      setFeedback('');
      setRating('0');
      alert('Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting your feedback. Please try again.');
    }
  }, [name, email, rating, feedback, navigate]);

  const isFormValid = name && email && feedback && rating !== '0';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 rounded-md bg-neutral-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 rounded-md bg-neutral-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your Feedback"
          required
          rows={4}
          className="w-full px-4 py-2 rounded-md bg-neutral-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="flex flex-col items-center">
        <label className="block text-gray-300 mb-2">Rating</label>
        <div className="flex justify-center space-x-2">
          {["1", "2", "3", "4", "5"].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${parseInt(star) <= parseInt(rating) ? 'text-yellow-400' : 'text-gray-400'}`}
            >
              <FaStar />
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className={`w-full h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.7)] hover:border-transparent ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
        disabled={!isFormValid}
      >
        Submit Feedback
      </button>
    </form>
  );
}