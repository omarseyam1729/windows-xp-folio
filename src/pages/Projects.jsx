import { useMemo } from 'react'
import projectsData from '../details/projects.json'
import ProjectCard from '../components/projects/ProjectCard'

const Projects = () => {
  const projects = useMemo(() => projectsData.projects || [], [])

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1 className="projects-title">My Projects</h1>
        <p className="projects-subtitle">A collection of my work and creative endeavors</p>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id || index}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            link={project.link}
            status={project.status}
            index={index}
          />
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="projects-empty">
          <div className="projects-empty-icon">📁</div>
          <p className="projects-empty-text">No projects to display</p>
          <p className="projects-empty-hint">Add projects to projects.json to see them here</p>
        </div>
      )}
    </div>
  )
}

export default Projects

