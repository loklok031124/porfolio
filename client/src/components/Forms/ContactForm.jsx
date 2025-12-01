/**
 * File: ContactForm.jsx
 * Description: Updated Contact form with state management and API integration
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactAPI } from '../../api/contact.api';

const ContactForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }
    
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
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
    setSuccessMessage('');
    
    try {
      await contactAPI.create(formData);
      setSuccessMessage('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        message: ''
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to send message' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      {successMessage && (
        <div className="success-message" style={{
          padding: '1rem',
          backgroundColor: '#10b981',
          color: 'white',
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          {successMessage}
        </div>
      )}
      
      {errors.submit && (
        <div className="error-message" style={{
          padding: '1rem',
          backgroundColor: '#ef4444',
          color: 'white',
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          {errors.submit}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="email" className="form-label">Email Address *</label>
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
          <label htmlFor="message" className="form-label">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
          ></textarea>
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;