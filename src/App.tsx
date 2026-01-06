import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ThemeToggle from './components/ThemeToggle'
import SocialLinks from './components/SocialLinks'
import { Suspense, lazy } from 'react'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Blog = lazy(() => import('./pages/Blog'))
const Bookshelf = lazy(() => import('./pages/Bookshelf'))

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1f1f1d] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <div className="fixed top-[17px] right-5 z-50 flex items-center gap-4">
        <SocialLinks />
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
        <ThemeToggle />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
      </Suspense>
    </div>
  )
}
