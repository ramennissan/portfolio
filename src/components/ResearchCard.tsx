import { motion } from 'framer-motion';

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
                <div className="flex-shrink-0 w-full md:w-48 h-40 md:h-40 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img 
                        src={research.image} 
                        alt={research.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold mb-3">
                        {research.paperLink ? (
                            <a 
                                href={research.paperLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-[#0073d5] hover:underline transition-colors"
                            >
                                {research.title}
                            </a>
                        ) : (
                            research.title
                        )}
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
                        <a 
                            href={research.paperLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-auto px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:opacity-80 transition-opacity"
                        >
                            ▪ Paper
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
