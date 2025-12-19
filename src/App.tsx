import Header from './components/Header'
import ThemeToggle from './components/ThemeToggle'
import SocialLinks from './components/SocialLinks'

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1f1f1d] transition-colors duration-300">
      <Header />
      <div className="fixed top-[17px] right-5 z-50 flex items-center gap-4">
        <SocialLinks />
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-black dark:text-white transition-colors duration-300">
        <h1 className="text-4xl font-bold mb-4">🚧 Website Under Construction 🚧</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">...</p>
      </div>
    </div>
  )
}
