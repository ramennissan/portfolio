import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ThemeToggle from './components/ThemeToggle'
import SocialLinks from './components/SocialLinks'
import About from './pages/About'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Bookshelf from './pages/Bookshelf'

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1f1f1d] transition-colors duration-300">
      <Header />
      <div className="fixed top-[17px] right-5 z-50 flex items-center gap-4">
        <SocialLinks />
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </div>
  )
}
