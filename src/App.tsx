import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import BackgroundDecor from './components/BackgroundDecor'
import ScrollToTop from './components/ScrollToTop'
import {
  ScrollProgressProvider,
  ScrollProgress,
} from '@/components/animate-ui/primitives/animate/scroll-progress';
import { Suspense, lazy } from 'react'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
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
    <ScrollProgressProvider className="app-scroll bg-white dark:bg-[#1f1f1d] text-gray-900 dark:text-gray-100 transition-colors duration-300 relative">
      <div className="fixed bottom-0 left-0 right-0 z-[100]">
        <ScrollProgress className="h-1" style={{ backgroundColor: '#0273d5' }} />
      </div>
      <BackgroundDecor />
      <ScrollToTop />
      <div className="relative z-10 min-h-full">
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
          </Routes>
        </Suspense>
      </div>
    </ScrollProgressProvider>
  )
}
