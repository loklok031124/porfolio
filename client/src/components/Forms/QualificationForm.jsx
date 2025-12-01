/**
 * File: QualificationForm.jsx
 * Description: Qualification/Education form for creating/editing qualifications
 */

import React, { useState, useEffect } from 'react';
import { qualificationAPI } from '../../api/qualification.api';

const QualificationForm = ({ qualification = null, onSuccess, onCancel }) => {
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
    if (qualification) {
      setFormData({
        title: qualification.title || '',
        firstname: qualification.firstname || '',
        lastname: qualification.lastname || '',
        email: qualification.email || '',
        completion: qualification.completion ? qualification.completion.split('T')[0] : '',
        description: qualification.description || ''
      });
    }
  }, [qualification]);

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
      if (qualification) {
        await qualificationAPI.update(qualification._id, formData);
      } else {
        await qualificationAPI.create(formData);
      }
      onSuccess?.();
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Operation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="qualification-form">
      {errors.submit && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {errors.submit}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="title" className="form-label">Qualification Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="e.g., Bachelor of Computer Science"
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
          placeholder="Describe your qualification..."
        ></textarea>
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : (qualification ? 'Update Qualification' : 'Create Qualification')}
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

export default QualificationForm;