import { motion } from "framer-motion";
import "react-medium-image-zoom/dist/styles.css";

import { Project as ProjectType } from "../components/ProjectCard";
import Hero from "../components/about/Hero";
import TLDR from "../components/about/tldr";
import ImportantDocuments from "../components/about/ImportantDocuments";
import EducationSection from "../components/about/Education";
import TechnicalExpertiseSection from "../components/about/TechnicalExpertise";
import GitHubChart from "../components/GitHubChart";
import ProjectsSection from "../components/about/ProjectSec";

const currentProjectIds = [
  "voxed",
  "illini-plan",
  "manim-video-agent",
  "illini-spots",
];

const featuredResearchIds = ["g1", "so-101", "tfc"];

export default function About() {
  // --- USER DATA CONFIGURATION ---
  // You can easily edit your info here:
  const currentProjects: ProjectType[] = [
    {
      id: "project-1",
      title: "Your Project Title",
      description: "A brief description of what you built and the technologies used.",
      link: "https://github.com/yourusername/project",
      linkText: "View on GitHub"
    },
    // Add more projects here
  ];

  const featuredResearch: Research[] = [
    /* {
      id: "res-1",
      title: "Research Title",
      authors: ["Your Name", "Collaborator"],
      year: 2024,
      venue: "Conference Name",
      link: "#",
      description: "Summary of your research contribution."
    } */
  ];
  // -------------------------------

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: '6rem' }}
      className="max-w-3xl mx-auto space-y-16 pb-12 w-full px-6"
    >
      <Hero />
      <TLDR />
      <ImportantDocuments />
      <EducationSection />
      <TechnicalExpertiseSection />
      <GitHubChart username="ramennissan" />
      <ProjectsSection
        projects={currentProjects}
        loading={false}
        error={null}
      />
    </motion.div>
  );
}