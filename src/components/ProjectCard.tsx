import React from 'react'
import styles from '../styles/ProjectCard.module.css'

interface ProjectCardProps {
  title: string
  description: string
  link: string
  linkText?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  link, 
  linkText = 'View Project' 
}) => {
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
