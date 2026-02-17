export default function RecentActivity() {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
                {[
                    { date: 'Oct 2023', activity: 'sample' },
                    { date: 'Sep 2023', activity: 'sample' },
                    { date: 'Aug 2023', activity: 'sample' },
                ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="text-gray-500 dark:text-gray-400 font-mono text-sm pt-1 w-20 shrink-0">{item.date}</div>
                        <div>{item.activity}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
