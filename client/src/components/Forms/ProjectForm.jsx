/**
 * File: ProjectForm.jsx
 * Student Name: [Your Name]
 * Student ID: [Your Student ID]
 * Date: [Current Date]
 * Description: Updated Project form with complete project details
 */

import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../api/project.api';

const ProjectForm = ({ project = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    role: '',
    outcome: '',
    tech: '',
    demoUrl: '',
    githubUrl: '',
    completion: '',
    firstname: '',
    lastname: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        role: project.role || '',
        outcome: project.outcome || '',
        tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
        demoUrl: project.demoUrl || '',
        githubUrl: project.githubUrl || '',
        completion: project.completion ? project.completion.split('T')[0] : '',
        firstname: project.firstname || '',
        lastname: project.lastname || '',
        email: project.email || ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Project title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.role.trim()) newErrors.role = 'Your role is required';
    if (!formData.outcome.trim()) newErrors.outcome = 'Project outcome is required';
    if (!formData.tech.trim()) newErrors.tech = 'At least one technology is required';
    if (!formData.completion) newErrors.completion = 'Completion date is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      // Convert tech string to array
      const techArray = formData.tech.split(',').map(t => t.trim()).filter(t => t);
      
      const projectData = {
        ...formData,
        tech: techArray
      };
      
      if (project) {
        await projectAPI.update(project._id, projectData);
      } else {
        await projectAPI.create(projectData);
      }
      onSuccess?.();
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Operation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      {errors.submit && (
        <div className="error-message" style={{ 
          marginBottom: '1rem',
          padding: '1rem',
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          borderRadius: '0.5rem'
        }}>
          {errors.submit}
        </div>
      )}
      
      {/* Project Title */}
      <div className="form-group">
        <label htmlFor="title" className="form-label">Project Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="e.g., Task Management App"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description" className="form-label">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
          placeholder="A collaborative task management application with real-time updates..."
        ></textarea>
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      {/* Role */}
      <div className="form-group">
        <label htmlFor="role" className="form-label">Your Role *</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={`form-input ${errors.role ? 'error' : ''}`}
          placeholder="e.g., Frontend Developer, Full-Stack Developer"
        />
        {errors.role && <span className="error-message">{errors.role}</span>}
      </div>

      {/* Outcome */}
      <div className="form-group">
        <label htmlFor="outcome" className="form-label">Project Outcome *</label>
        <input
          type="text"
          id="outcome"
          name="outcome"
          value={formData.outcome}
          onChange={handleChange}
          className={`form-input ${errors.outcome ? 'error' : ''}`}
          placeholder="e.g., Successfully deployed to 500+ active users"
        />
        {errors.outcome && <span className="error-message">{errors.outcome}</span>}
      </div>

      {/* Technologies */}
      <div className="form-group">
        <label htmlFor="tech" className="form-label">Technologies Used * (comma separated)</label>
        <input
          type="text"
          id="tech"
          name="tech"
          value={formData.tech}
          onChange={handleChange}
          className={`form-input ${errors.tech ? 'error' : ''}`}
          placeholder="React, Firebase, Material-UI, WebSockets"
        />
        <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          Separate technologies with commas (e.g., React, Node.js, MongoDB)
        </small>
        {errors.tech && <span className="error-message">{errors.tech}</span>}
      </div>

      {/* URLs Section */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="demoUrl" className="form-label">Demo URL</label>
          <input
            type="url"
            id="demoUrl"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="https://demo.example.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="githubUrl" className="form-label">GitHub URL</label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="https://github.com/username/project"
          />
        </div>
      </div>

      {/* Completion Date */}
      <div className="form-group">
        <label htmlFor="completion" className="form-label">Completion Date *</label>
        <input
          type="date"
          id="completion"
          name="completion"
          value={formData.completion}
          onChange={handleChange}
          className={`form-input ${errors.completion ? 'error' : ''}`}
        />
        {errors.completion && <span className="error-message">{errors.completion}</span>}
      </div>

      {/* Optional: Contact Information */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f9fafb', 
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{ marginBottom: '1rem', color: '#374151' }}>
          Optional: Contact Information
        </h4>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstname" className="form-label">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastname" className="form-label">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
        </button>
        
        {onCancel && (
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
/**
 * File: ProjectForm.jsx
 * Description: Project form for creating/editing projects


import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../api/project.api';

const ProjectForm = ({ project = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        firstname: project.firstname || '',
        lastname: project.lastname || '',
        email: project.email || '',
        completion: project.completion ? project.completion.split('T')[0] : '',
        description: project.description || ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.completion) newErrors.completion = 'Completion date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      if (project) {
        await projectAPI.update(project._id, formData);
      } else {
        await projectAPI.create(formData);
      }
      onSuccess?.();
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Operation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      {errors.submit && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {errors.submit}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="title" className="form-label">Project Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`form-input ${errors.title ? 'error' : ''}`}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstname" className="form-label">First Name *</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className={`form-input ${errors.firstname ? 'error' : ''}`}
          />
          {errors.firstname && <span className="error-message">{errors.firstname}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="lastname" className="form-label">Last Name *</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className={`form-input ${errors.lastname ? 'error' : ''}`}
          />
          {errors.lastname && <span className="error-message">{errors.lastname}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? 'error' : ''}`}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="completion" className="form-label">Completion Date *</label>
        <input
          type="date"
          id="completion"
          name="completion"
          value={formData.completion}
          onChange={handleChange}
          className={`form-input ${errors.completion ? 'error' : ''}`}
        />
        {errors.completion && <span className="error-message">{errors.completion}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
        ></textarea>
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
        </button>
        
        {onCancel && (
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
 */