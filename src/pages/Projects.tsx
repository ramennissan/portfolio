import React, { useMemo, useState } from 'react';
import ProjectCard, { Project } from '@/components/ProjectCard';

const sampleProjects: Project[] = [
  {
    id: 'voxed',
    title: 'Voxed: Your Second Brain',
    description: 'Knowledge and research assistant and agent.',
    link: '#',
    tags: ['React', 'Machine Learning', 'AI', 'LLMs'],
  },
  {
    id: 'illini',
    title: 'IlliniPlan: AI Powered Class Planner',
    description: 'Helps students create course plans and track graduation readiness.',
    link: '#',
    tags: ['React', 'Algorithms', 'Machine Learning'],
  },
  {
    id: 'manim',
    title: 'Manim Video Agent',
    description: 'Multimodal video generator for educational content.',
    link: '#',
    tags: ['AI & Machine Learning', 'LLMs'],
  },
  {
    id: 'illinispots',
    title: 'IlliniSpots: The Instagram of UIUC',
    description: 'Map-based social app for campus buildings and photos.',
    link: '#',
    tags: ['App Dev', 'Postgres', 'Firebase'],
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<string>('All');

  const tags = useMemo(() => {
    const set = new Set<string>();
    sampleProjects.forEach(p => p.tags?.forEach(t => set.add(t)));
    return ['All', ...Array.from(set)];
  }, []);

  const visible = useMemo(() => {
    if (filter === 'All') return sampleProjects;
    return sampleProjects.filter(p => p.tags?.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Projects</h1>
          <p className="text-gray-600">Selected work, demos, and explorations.</p>
        </div>

        <div>
          <label className="sr-only">Filter by tag</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 shadow-sm bg-white focus:outline-none"
          >
            {tags.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visible.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
