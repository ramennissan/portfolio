export default function Hero() {
  return (
    <header className="mb-6 w-full">
      <div className="max-w-3xl mx-auto flex items-center gap-6 px-6">
        <div className="flex-shrink-0 w-36 h-36 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">Ramen Nissan</h1>
          <p className="mt-2">
            <a href="mailto:ramen.nissan@hotmail.com" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:underline">ramen[dot]nissan[at]hotmail[dot]com</a>
            <span className="mx-2 text-gray-400">•</span>
            <a href="mailto:ramen.nissan@torontomu.ca" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:underline">ramen[dot]nissan[at]torontomu[dot]ca</a>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-xl">I aspire to research AI/ML. I enjoy solving problems at the intersection of machine learning/computer vision, specifcally their applications in fields like physics and bio.</p>
        </div>
      </div>
    </header>
  );
}
