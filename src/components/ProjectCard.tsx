import React from 'react'
import styles from '../styles/ProjectCard.module.css'
import { Link } from 'react-router-dom'

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  tags?: string[];
  githubUrl?: string;
  demoUrl?: string;
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

      <div className={styles.cardFooter}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to={`/projects/${project.id}`} className={styles.link}>
            View Project
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
