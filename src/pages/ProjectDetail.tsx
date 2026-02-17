import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Project as ProjectType } from '@/components/ProjectCard'

// Minimal in-memory lookup for sample projects — replace with real data source later
const SAMPLE: Record<string, ProjectType> = {
  'this-website': {
    id: 'this-website',
    title: 'This Website',
    description: 'This portfolio is built with React, TypeScript, Tailwind and Vite.',
    link: 'https://ramennissan.me',
    githubUrl: 'https://github.com/ramennissan/portfolio',
    demoUrl: 'https://ramennissan.me',
    tags: ['Webdev', 'React'],
  },
  '2doit': {
    id: '2doit',
    title: '2DoIT',
    description: 'A lightweight iOS to-do list app built with SwiftUI, designed to help students organize assignments, exams, and deadlines efficiently.',
    link: 'https://github.com/ramennissan/2DoIT',
    githubUrl: 'https://github.com/ramennissan/2DoIT',
    tags: ['App', 'Not Released']
  }
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = id ? SAMPLE[id] : undefined

  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-12" style={{ marginTop: '6rem' }}>
      <Link to="/projects" className="text-sm text-gray-700 dark:text-gray-300 mb-4 inline-block">← Back to Projects</Link>

      {project ? (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold">{project.title}</h1>
            {project.tags && (
              <div className="flex gap-3 mt-2">
                {project.tags.map(t => (
                  <span key={t} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm dark:bg-gray-700 dark:text-gray-100">{t}</span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-md hover:opacity-90" aria-label="Open GitHub repository">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.9 3.17 9.06 7.57 10.53.55.1.75-.24.75-.53 0-.26-.01-1.03-.02-1.87-3.08.67-3.73-.77-3.73-.77-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.08-.66.08-.66 1.1.08 1.68 1.13 1.68 1.13.97 1.67 2.55 1.19 3.17.91.1-.71.38-1.19.69-1.46-2.46-.28-5.05-1.23-5.05-5.48 0-1.21.43-2.2 1.13-2.97-.11-.28-.49-1.42.11-2.95 0 0 .92-.29 3.02 1.13a10.5 10.5 0 0 1 2.75-.37c.93 0 1.87.13 2.75.37 2.09-1.42 3.01-1.13 3.01-1.13.6 1.53.22 2.67.11 2.95.7.77 1.13 1.76 1.13 2.97 0 4.26-2.6 5.19-5.07 5.47.39.33.73.98.73 1.98 0 1.43-.01 2.58-.01 2.93 0 .29.2.64.76.53C19.09 20.81 22.25 16.65 22.25 11.75 22.25 5.48 17.27.5 11 .5z" fill="white" />
                </svg>
                <span>GitHub</span>
              </a>
            )}

            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-md hover:opacity-90" aria-label="Open live demo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" fill="white" />
                  <path d="M19 19H5V5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-2v6z" fill="white" />
                </svg>
                <span>Live Demo</span>
              </a>
            )}

            {!project.githubUrl && !project.demoUrl && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-lg font-medium">{project.link}</a>
            )}
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300">{project.description}</p>

        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold">Project not found</h2>
          <p className="text-gray-600">This project may be a placeholder — add it to your data source.</p>
        </div>
      )}
    </div>
  )
}
