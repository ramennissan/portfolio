import ProjectCard, { Project } from '../ProjectCard';

interface ProjectsSectionProps {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

export default function ProjectsSection({ projects, loading, error }: ProjectsSectionProps) {
    if (loading) return <div>Loading projects...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <section id="projects">
            <h2 className="text-3xl font-semibold mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}
