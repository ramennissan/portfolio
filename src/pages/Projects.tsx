import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard, { Project } from '@/components/ProjectCard';


const sampleProjects: Project[] = [
  {
    id: 'this-website',
    title: 'This Website',
    description: 'The source and live demo of this portfolio website. Built with React, TypeScript, and Tailwind.',
    link: '#',
    tags: ['Webdev', 'React'],
  },
  {
    id: '2doit',
    title: '2DoIT',
    description: 'An iOS to-do list app built with SwiftUI, made to help organize assignments, exams, and deadlines efficiently.',
    link: 'https://github.com/ramennissan/2DoIT',
    githubUrl: 'https://github.com/ramennissan/2DoIT',
    tags: ['App', 'Not Released'],
  }
];

type DropdownProps = {
  value: string;
  options: string[];
  onChange: (v: string) => void;
};

function Dropdown({ value, options, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div ref={ref} className="inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 flex items-center gap-2"
      >
        <span>{value}</span>
        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <motion.ul
        initial={{ opacity: 0, y: -6 }}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        style={{ originY: 0 }}
        className={`absolute right-0 mt-2 w-44 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-40 ${open ? '' : 'pointer-events-none'}`}
        role="listbox"
      >
        <div className="py-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-lg">
          {options.map(opt => (
            <li key={opt}>
              <button
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm ${opt === value ? 'font-semibold' : 'font-normal'} text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700`}
              >
                {opt}
              </button>
            </li>
          ))}
        </div>
      </motion.ul>
    </div>
  );
}


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
    <section id="projects" style={{ marginTop: '6rem' }} className="max-w-3xl mx-auto space-y-16 pb-12 w-full px-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Projects</h1>
        </div>

        <div className="relative">
          <label className="sr-only">Filter by tag</label>
          <Dropdown
            value={filter}
            onChange={(v: string) => setFilter(v)}
            options={tags}
          />
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
      >
        {visible.map((p) => (
          <motion.div
            key={p.id}
            variants={{
              hidden: { opacity: 0, y: 10, scale: 0.995 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: 'spring', stiffness: 120, damping: 18 },
              },
            }}
            layout
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
