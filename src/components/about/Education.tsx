export default function EducationSection() {
    return (
        <section id="education" style={{ scrollMarginTop: '6rem' }} className="py-6">
            <h2 className="text-3xl font-semibold mb-6">Education</h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start md:items-center">
                <div className="md:col-span-4 flex flex-col items-center">
                    <img src="/assets/About/TMU_logo.png" alt="TMU logo" className="w-36 h-36 md:w-40 md:h-40 object-contain" />
                    <div className="mt-3 -translate-y-4">
                        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full">GPA: 4.20</span>
                    </div>
                </div>

                <div className="md:col-span-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <h3 className="text-lg md:text-xl font-bold text-blue-700 dark:text-blue-300 md:whitespace-nowrap leading-snug">Toronto Metropolitan University</h3>
                        <span className="text-sm text-gray-500 font-mono mt-2 sm:mt-0">Graduating 2029</span>
                    </div>

                    <div className="space-y-1 mt-1">
                        <div className="text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium italic">Bachelor of Engineering (Computer Engineering)</div>

                        <p className="text-gray-600 dark:text-gray-400">Minor in Mathematics and Physics.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
