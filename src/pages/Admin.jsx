import { useEffect, useState } from "react";
import axios from "axios";
import { FaMoon, FaSun } from "react-icons/fa";


const API_URL = import.meta.env.VITE_API_URL  || "http://localhost:5000";

console.log(API_URL);


export default function Admin() {
  const [urls, setUrls] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const fetchUrls = () => {
    axios
      .get(`${API_URL}/admin/urls`)
      .then((res) => setUrls(res.data))
      .catch((err) => console.error(err));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Short URL copied to clipboard!");
  };

  useEffect(() => {
    fetchUrls();
    const intervalId = setInterval(fetchUrls, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`p-4 sm:p-6 md:p-8 min-h-screen transition-colors duration-300 ${darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900"
        }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
          📊 Admin Panel
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
          className={`p-2 sm:p-3 rounded-full transition-transform duration-200 hover:scale-110 ${darkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
        >
          {darkMode ? (
            <FaSun className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <FaMoon className="text-gray-800 w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>

      {/* URLs */}
      {urls.length === 0 ? (
        <p className="text-base sm:text-lg opacity-80">No URLs found</p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {urls.map((url) => {
            const shortUrl = `${API_URL}/${url.shortCode}`;
            const truncatedLongUrl =
              url.longUrl.length > 50
                ? url.longUrl.slice(0, 50) + "..."
                : url.longUrl;

            return (
              <div
                key={url._id}
                className={`relative rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-6 border ${darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white/80 border-gray-200 backdrop-blur-md"
                  }`}
              >
                <div className="mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm opacity-70">Long URL</span>
                  <a
                    href={url.longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={url.longUrl}
                    className={`block mt-1 text-sm sm:text-base font-medium break-all hover:underline ${darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                  >
                    {truncatedLongUrl}
                  </a>
                </div>

                <div className="mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm opacity-70">Short URL</span>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-1">
                    <span className="font-mono text-sm break-all">{shortUrl}</span>
                    <button
                      onClick={() => copyToClipboard(shortUrl)}
                      className={`px-3 py-1 text-xs sm:text-sm rounded-lg shadow transition ${darkMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                        }`}
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm opacity-70">Clicks</span>
                  <span
                    className={`px-3 py-1 text-xs sm:text-sm rounded-full font-semibold shadow ${darkMode
                        ? "bg-green-700 text-green-100"
                        : "bg-gradient-to-r from-green-100 to-green-200 text-green-800"
                      }`}
                  >
                    {url.clicks}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
