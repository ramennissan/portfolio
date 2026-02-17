import { motion } from 'framer-motion';

export interface Research {
    id: string;
    title: string;
    authors: string[];
    venue?: string;
    year: number;
    link?: string;
    description?: string;
}

interface ResearchCardProps {
    item: Research;
}

export default function ResearchCard({ item }: ResearchCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#2a2a28] shadow-sm hover:shadow-md transition-all"
        >
            <h3 className="text-xl font-bold mb-2">
                {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-[#0073d5] transition-colors">
                        {item.title}
                    </a>
                ) : (
                    item.title
                )}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {item.authors.join(', ')}
            </p>
            <p className="text-sm font-medium">
                {item.venue} {item.year}
            </p>
            {item.description && (
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {item.description}
                </p>
            )}
        </motion.div>
    );
}
