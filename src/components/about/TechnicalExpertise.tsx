import { SiPython, SiCplusplus, SiTypescript } from 'react-icons/si';
import { DiJava } from 'react-icons/di';

export default function TechnicalExpertiseSection() {
    const coreGroups = [
        {
            title: 'Machine Learning & AI',
            tags: ['CNNs', 'Transformers', 'RAG', 'LLMs', 'Computer Vision', 'NLP', 'PyTorch', 'TensorFlow']
        },
        {
            title: 'Software Development',
            tags: ['Python', 'JavaScript/TypeScript', 'React', 'Node.js', 'Git', 'Docker']
        },
        {
            title: 'Physics & Mathematics',
            tags: ['Classical Mechanics', 'Linear Algebra', 'Calculus', 'Differential Equations']
        }
    ];

    const languages = [
        { name: 'Python', Icon: SiPython },
        { name: 'C++', Icon: SiCplusplus },
        { name: 'TypeScript', Icon: SiTypescript },
        { name: 'Java', Icon: DiJava },
    ];

    return (
        <section className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Technical Expertise</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Left: core skill groups (wider) */}
                <div className="sm:col-span-2 p-6 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-gray-700 transition-colors duration-150">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Core Skills</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {coreGroups.map((group) => (
                        <div key={group.title} className="mb-0">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-semibold text-gray-900 dark:text-gray-100">{group.title}</div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-3">
                                {group.tags.map((tag) => (
                                    <span key={tag} className="inline-flex items-center justify-center px-2 py-1 sm:px-3 sm:py-0.5 bg-blue-50 border border-slate-100 dark:bg-gray-800 dark:border-gray-700 rounded-full text-xs text-slate-900 dark:text-gray-200 whitespace-nowrap">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Right: languages with logos (no percentages) */}
                <div className="p-6 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-gray-700 transition-colors duration-150">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Languages</h3>
                    <div className="space-y-3">
                        {languages.map(({ name, Icon }) => (
                            <div key={name} className="flex items-center gap-3 justify-between">
                                <div className="flex items-center gap-3">
                                    <Icon className="w-6 h-6 text-gray-800 dark:text-gray-100" />
                                    <div className="font-medium text-gray-900 dark:text-gray-100">{name}</div>
                                </div>
                                {/* placeholder for optional detail; left empty on purpose */}
                                <div className="text-sm text-gray-400"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
