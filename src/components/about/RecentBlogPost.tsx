export default function RecentBlogSection() {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Recent Blog Posts</h2>
            <div className="space-y-4">
                {[
                    { title: 'sample', date: 'Oct 12, 2023', excerpt: 'sample' },
                    { title: 'sample', date: 'Sep 28, 2023', excerpt: 'sample' },
                ].map((post, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold group-hover:text-[#0073d5] transition-colors">{post.title}</h3>
                            <span className="text-xs text-gray-500 font-mono shrink-0">{post.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{post.excerpt}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
