import UrlForm from "../components/UrlForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B2746] text-white flex flex-col items-center px-4 sm:px-6">

      {/* Navigation Bar */}
      <header className="w-full flex flex-row justify-between items-center py-6 sm:py-10 max-w-7xl gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold text-orange-500">Quick Shrink</h1>
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <button className="bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-[#0B2746] transition text-sm sm:text-base">
            Get Started Free
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-6 sm:mt-8 max-w-5xl px-2 sm:px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 sm:mb-7 leading-tight">
          Build stronger digital connections
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
          Use our URL shortener landing pages to engage your audience and connect them to the right information.
          Build and track everything in one platform.
        </p>
      </section>

      {/* Form Card */}
      <div className="w-full flex justify-center">
        <UrlForm />
      </div>

      {/* Footer Section */}
      <footer className="mt-10 sm:mt-12 text-xs sm:text-sm text-gray-300 text-center">
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </footer>
    </div>
  );
}
