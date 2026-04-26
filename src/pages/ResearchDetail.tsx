import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Research as ResearchType } from '@/components/ResearchCard'
import { sampleResearch } from '../data/researchData'

export default function ResearchDetail() {
  const { id } = useParams<{ id: string }>()
  const research = id ? sampleResearch.find(r => r.id === id) : undefined

  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-12" style={{ marginTop: '6rem' }}>
      <Link to="/research" className="text-sm text-gray-700 dark:text-gray-300 mb-4 inline-block">← Back to Research</Link>

      {research ? (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold">{research.title}</h1>
            {research.tags && (
              <div className="flex gap-3 mt-2">
                {research.tags.map(t => (
                  <span key={t} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm dark:bg-gray-700 dark:text-gray-100">{t}</span>
                ))}
              </div>
            )}
          </div>

          {research.image && (
            <div className="flex justify-center">
              <div className="inline-flex rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 border border-gray-100 dark:border-gray-700">
                <img src={research.image} alt={research.title} className="w-auto h-auto max-w-full max-h-[60vh] object-contain object-center" />
              </div>
            </div>
          )}

          <div>
            {research.paperLink && (
              <Link
                to={`/research/${research.id}/paper`}
                className="inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold text-black dark:text-white no-underline hover:opacity-90 transition-opacity"
                aria-label="Open paper"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="currentColor" />
                  <path d="M13 2v6h6" fill="currentColor" />
                </svg>
                <span>Paper</span>
              </Link>
            )}
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300">{research.description}</p>

        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold">Research not found</h2>
          <p className="text-gray-600">This research item may be a placeholder — add it to your data source.</p>
        </div>
      )}
    </div>
  )
}
