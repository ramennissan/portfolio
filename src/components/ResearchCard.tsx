import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface Research {
    id: string;
    title: string;
    description: string;
    image?: string;
    tags: string[];
    paperLink?: string;
    index?: number;
}

interface ResearchCardProps {
    research: Research;
    index?: number;
}

export default function ResearchCard({ research, index = 0 }: ResearchCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#2a2a28] shadow-sm hover:shadow-md transition-all"
        >
            {research.image && (
                <div className="flex-shrink-0 w-full md:w-auto">
                    <div className="inline-flex rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 border border-gray-100 dark:border-gray-700 items-center justify-center">
                        <img 
                            src={research.image} 
                            alt={research.title}
                            className="w-auto h-auto max-w-full max-h-48 md:max-h-56 object-contain object-center"
                        />
                    </div>
                </div>
            )}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold mb-3">
                        <Link to={`/research/${research.id}`} className="text-[#0073d5] hover:underline transition-colors">
                            {research.title}
                        </Link>
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {research.description}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    {research.tags.map((tag) => (
                        <span 
                            key={tag}
                            className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                    {research.paperLink && (
                        <Link
                            to={`/research/${research.id}/paper`}
                            className="ml-auto inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold text-black dark:text-white no-underline hover:opacity-80 transition-opacity focus:outline-none"
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
            </div>
        </motion.div>
    );
}
