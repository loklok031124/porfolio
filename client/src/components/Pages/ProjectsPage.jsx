
import React from 'react'
import { FolderOpen, ExternalLink, Code } from 'lucide-react'

const ProjectsPage = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React and Node.js, featuring payment integration, inventory management, and admin dashboard.",
      role: "Lead Developer",
      outcome: "Increased client sales by 40% and improved user engagement",
      tech: ["React", "Node.js", "MongoDB", "Stripe API"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and advanced analytics.",
      role: "Frontend Developer",
      outcome: "Successfully deployed to 500+ active users",
      tech: ["React", "Firebase", "Material-UI", "WebSockets"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Weather Dashboard",
      description: "An interactive weather dashboard providing detailed forecasts, historical data visualization, and location-based alerts.",
      role: "Full-Stack Developer",
      outcome: "Featured in local tech meetup and gained 1K+ GitHub stars",
      tech: ["Vue.js", "Express.js", "Chart.js", "Weather API"],
      demoUrl: "#",
      githubUrl: "#"
    }
  ]

  return (
    <div className="projects-page">
      <div className="container">
        <h1 className="text-center mb-6">My Projects</h1>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <FolderOpen size={60} style={{color: 'rgba(255, 255, 255, 0.8)'}} />
              </div>
              
              <div className="project-details">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-meta">
                  <p className="project-role">Role: {project.role}</p>
                  <p className="project-outcome">Outcome: {project.outcome}</p>
                </div>
                
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="project-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-links">
                  <a href={project.demoUrl} className="project-link">
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                  <a href={project.githubUrl} className="project-link">
                    <Code size={16} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage