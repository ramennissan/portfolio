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
  const { title, description, link, linkText = 'View Project', tags = [] } = project;
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      )}

      <div className={styles.metaRow}>
        <div className={styles.stats}>
          <span className={styles.stat}>🧠 <strong>1k+</strong></span>
          <span className={styles.stat}>🚀 <strong>1k+</strong></span>
          <span className={styles.stat}>💡 <strong>1k+</strong></span>
        </div>
        <a href={link} className={styles.link} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
