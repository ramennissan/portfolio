import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { sampleResearch } from '../data/researchData'

export default function PaperPlaceholder() {
  const { id } = useParams<{ id: string }>()
  const research = id ? sampleResearch.find(r => r.id === id) : undefined

  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-12" style={{ marginTop: '6rem' }}>
      <Link to={id ? `/research/${id}` : '/research'} className="text-sm text-gray-700 dark:text-gray-300 mb-4 inline-block">← Back</Link>

      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold">Paper in progress</h1>
        {research && <h2 className="text-2xl font-semibold">{research.title}</h2>}
        <p className="text-gray-700 dark:text-gray-300">This paper is currently in progress. Check back later for updates.</p>
      </div>
    </div>
  )
}
