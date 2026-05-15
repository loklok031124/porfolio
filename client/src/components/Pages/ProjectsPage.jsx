/**
 * File: ProjectsPage.jsx
 * Student Name: [Your Name]
 * Student ID: [Your Student ID]
 * Date: [Current Date]
 * Description: Updated Projects page displaying complete project details
 * 
 


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
 */
/**
 * File: ProjectsPage.jsx
 * Description: Projects page displaying all projects (Fixed CSS version)
 */

import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../api/project.api';
import { FolderOpen, ExternalLink, Code } from 'lucide-react';

const Fallback = () => (
  <div style={{
    height: '100%',
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <FolderOpen size={60} style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
  </div>
);

const screenshotUrl = (url) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=640&h=420`;

const ProjectPreview = ({ demoUrl, githubUrl, title }) => {
  const isValid = (url) => url && url !== '#';
  const [failed, setFailed] = useState(false);

  const src = isValid(demoUrl)
    ? screenshotUrl(demoUrl)
    : isValid(githubUrl)
    ? screenshotUrl(githubUrl)
    : null;

  if (!src || failed) {
    return (
      <div style={{ height: '12rem', borderRadius: '1rem 1rem 0 0', overflow: 'hidden' }}>
        <Fallback />
      </div>
    );
  }

  return (
    <div style={{ height: '12rem', borderRadius: '1rem 1rem 0 0', overflow: 'hidden' }}>
      <img
        src={src}
        alt={`Preview of ${title}`}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={() => setFailed(true)}
      />
    </div>
  );
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      setError('Failed to fetch projects');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="projects-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p>Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem', color: '#ef4444' }}>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="container">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>My Projects</h1>
          
          {projects.length === 0 ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ color: '#6b7280' }}>No projects found</p>
            </div>
          ) : (
            <div className="grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {projects.map((project, index) => (
                <div key={project._id || index} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {/* Link Preview */}
                  <ProjectPreview
                    demoUrl={project.demoUrl}
                    githubUrl={project.githubUrl}
                    title={project.title}
                  />
                  
                  {/* Project Details */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '700', 
                      color: '#1f2937',
                      marginBottom: '0.75rem' 
                    }}>
                      {project.title}
                    </h3>
                    
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      marginBottom: '1rem'
                    }}>
                      {project.description}
                    </p>
                    
                    {/* Role and Outcome */}
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ 
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#3b82f6',
                        marginBottom: '0.25rem'
                      }}>
                        Role: {project.role}
                      </p>
                      <p style={{ 
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        Outcome: {project.outcome}
                      </p>
                    </div>
                    
                    {/* Technologies */}
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      {Array.isArray(project.tech) && project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#dbeafe',
                            color: '#1e40af',
                            fontSize: '0.75rem',
                            borderRadius: '9999px'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem' }}>
                      {project.demoUrl && project.demoUrl !== '#' && (
                        <a 
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.875rem',
                            color: '#3b82f6',
                            textDecoration: 'none',
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                          onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            textDecoration: 'none',
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.color = '#374151'}
                          onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                        >
                          <Code size={16} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;