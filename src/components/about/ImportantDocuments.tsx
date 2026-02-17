export default function ImportantDocuments() {
    return (
        <section>
            <h2 className="text-3xl font-semibold mb-6">Important Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/assets/PDFs/Resume.pdf" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                        <div className="font-bold">Resume</div>
                        <div className="text-sm text-gray-500">PDF (118 KB)</div>
                    </div>
                </a>
                <a href="/assets/PDFs/Unoffical%20Transcript.pdf" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-3">
                    <span className="text-2xl">📑</span>
                    <div>
                        <div className="font-bold">Unoffical Transcript</div>
                        <div className="text-sm text-gray-500">PDF (11KB)</div>
                    </div>
                </a>
            </div>
        </section>
    );
}
