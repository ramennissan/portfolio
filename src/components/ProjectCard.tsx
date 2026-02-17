import React from 'react'
import styles from '../styles/ProjectCard.module.css'

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, link, linkText = 'View Project' } = project;
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <a href={link} className={styles.link} target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>
    </div>
  )
}

export default ProjectCard
