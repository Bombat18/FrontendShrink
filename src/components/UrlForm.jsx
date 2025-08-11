import { useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";

const API_URL = import.meta.env.VITE_API_URL  || "http://localhost:5000";




export default function UrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);


  console.log(API_URL);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl(""); // clear old short link
    try {
      const { data } = await axios.post(`${API_URL}/api/shorten`, {
        longUrl,
      });
      setShortUrl(data.shortUrl);

      // 🎉 Trigger confetti when link is created
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (error) {
      alert("Failed to shorten URL. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-200 
                 w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[30vw] 
                 min-h-[40vh] flex flex-col items-center justify-center"
    >
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
        🔗 Premium URL Shortener
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 w-full">
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 
                     focus:border-transparent transition text-black text-sm sm:text-base"
          required
        />

        <button
          className={`w-full py-2 sm:py-3 rounded-xl text-white font-semibold shadow-md 
                      transition-transform transform hover:scale-105 active:scale-95 
                      ${loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
            }`}
          disabled={loading}
        >
          {loading ? "Shortening..." : "✨ Shorten URL"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl text-center w-full">
          <p className="text-gray-700 mb-1 font-medium text-sm sm:text-base">
            Here’s your short link:
          </p>
          <a
            href={shortUrl}
            className="text-blue-600 font-semibold underline break-all text-sm sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
