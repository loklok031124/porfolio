/**
 * File: ProjectList.jsx
 * Description: Project list with CRUD operations
 */

import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../api/project.api';
import { useAuth } from '../../context/AuthContext';
import ProjectForm from '../Forms/ProjectForm';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const ProjectList = () => {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);

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
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await projectAPI.delete(id);
      setProjects(projects.filter(p => p._id !== id));
      alert('Project deleted successfully');
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchProjects();
    alert(editingProject ? 'Project updated successfully' : 'Project created successfully');
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading projects...</div>;
  }

  if (error) {
    return <div style={{ color: '#ef4444', padding: '2rem' }}>{error}</div>;
  }

  return (
    <div className="project-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Projects ({projects.length})</h2>
        {isAdmin() && (
          <button 
            onClick={handleAdd}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={18} />
            Add Project
          </button>
        )}
      </div>

      {showForm && (
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>
          <ProjectForm 
            project={editingProject}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </div>
      )}

      {projects.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: '#6b7280' }}>No projects found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map(project => (
            <div key={project._id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    By: {project.firstname} {project.lastname}
                  </p>
                  <p style={{ color: '#374151', marginTop: '0.5rem' }}>
                    {project.description?.substring(0, 150)}...
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    Completed: {new Date(project.completion).toLocaleDateString()}
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setViewingProject(project)}
                    style={{
                      padding: '0.5rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer'
                    }}
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  
                  {isAdmin() && (
                    <>
                      <button
                        onClick={() => handleEdit(project)}
                        style={{
                          padding: '0.5rem',
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer'
                        }}
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        style={{
                          padding: '0.5rem',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer'
                        }}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewingProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setViewingProject(null)}>
          <div className="card" style={{
            maxWidth: '600px',
            width: '90%',
            padding: '2rem',
            maxHeight: '80vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1rem' }}>{viewingProject.title}</h2>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Author:</strong> {viewingProject.firstname} {viewingProject.lastname}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Email:</strong> {viewingProject.email}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Completion Date:</strong> {new Date(viewingProject.completion).toLocaleDateString()}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Description:</strong>
              <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{viewingProject.description}</p>
            </div>
            <button 
              onClick={() => setViewingProject(null)}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;