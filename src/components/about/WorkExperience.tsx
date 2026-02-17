export default function WorkExperienceSection() {
    const experiences = [
        {
            company: 'sample',
            role: 'sample',
            period: 'sample',
            description: 'sample'
        }
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
            <div className="space-y-8">
                {experiences.map((exp, i) => (
                    <div key={i}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                            <h3 className="text-lg font-bold">{exp.company}</h3>
                            <span className="text-sm text-gray-500 font-mono">{exp.period}</span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 font-medium mb-2">{exp.role}</div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
