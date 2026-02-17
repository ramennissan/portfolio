import ResearchCard, { Research } from '../ResearchCard';

interface ResearchSectionProps {
    research: Research[];
    loading: boolean;
    error: string | null;
}

export default function ResearchSection({ research, loading, error }: ResearchSectionProps) {
    if (loading) return <div>Loading research...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!research || research.length === 0) return null;

    return (
        <section>
            <h2 className="text-3xl font-semibold mb-6">Research</h2>
            <div className="grid grid-cols-1 gap-6">
                {research.map((item) => (
                    <ResearchCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}
