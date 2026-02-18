export default function Hero() {
  return (
    <header className="mb-6 w-full">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 px-6">
        <div className="flex-shrink-0 w-36 h-36 rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-center text-xs text-gray-600 dark:text-gray-300 px-2">Photo coming soon</span>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">Ramen Nissan</h1>
          <p className="mt-2 flex flex-col sm:flex-row items-center gap-1 text-sm">
            <a href="mailto:ramen.nissan@hotmail.com" className="w-full text-center sm:w-auto sm:text-left whitespace-normal sm:whitespace-nowrap break-words">ramen[dot]nissan[at]hotmail[dot]com</a>
            <span className="hidden sm:inline mx-1 text-gray-400">•</span>
            <a href="mailto:ramen.nissan@torontomu.ca" className="w-full text-center sm:w-auto sm:text-left whitespace-normal sm:whitespace-nowrap break-words">ramen[dot]nissan[at]torontomu[dot]ca</a>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-xl">I aspire to research AI/ML. I enjoy solving problems at the intersection of machine learning/computer vision, specifically their applications in fields like physics and bio.</p>
        </div>
      </div>
    </header>
  );
}
