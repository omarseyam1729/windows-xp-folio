const ProjectCard = ({ title, description, technologies, link, status, index }) => {
  const statusColors = {
    'Active': '#4CAF50',
    'Completed': '#2196F3',
    'In Progress': '#FF9800',
    'On Hold': '#9E9E9E'
  }

  const statusColor = statusColors[status] || '#9E9E9E'

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-card-icon">
          <span className="project-icon-emoji">💼</span>
        </div>
        <div className="project-card-title-section">
          <h3 className="project-card-title">{title}</h3>
          <div className="project-card-status" style={{ backgroundColor: `${statusColor}20`, color: statusColor, borderColor: statusColor }}>
            <span className="project-status-dot" style={{ backgroundColor: statusColor }}></span>
            {status}
          </div>
        </div>
      </div>
      
      <p className="project-card-description">{description}</p>
      
      <div className="project-card-tech">
        <span className="project-tech-label">Technologies:</span>
        <div className="project-tech-tags">
          {technologies && technologies.map((tech, i) => (
            <span key={i} className="project-tech-tag">{tech}</span>
          ))}
        </div>
      </div>
      
      {link && link !== '#' && (
        <div className="project-card-footer">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="project-card-link"
          >
            <span className="project-link-icon">🔗</span>
            <span>View Project</span>
            <span className="project-link-arrow">→</span>
          </a>
        </div>
      )}
    </div>
  )
}

export default ProjectCard

