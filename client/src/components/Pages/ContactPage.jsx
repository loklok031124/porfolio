import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'

const ContactPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert('Please fill in all required fields.')
      return
    }
    
    // Form submission logic would go here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I will get back to you soon.')
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: ''
    })
    
    // Redirect to home page
    navigate('/')
  }

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="text-center mb-6">Contact Me</h1>
        
        <div className="contact-grid">
          {/* Contact Information Panel */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can work together to bring your ideas to life.
            </p>
            
            <ul className="contact-details">
              <li className="contact-detail">
                <Mail size={20} />
                <span>jeff.siu@gmail.com</span>
              </li>
              <li className="contact-detail">
                <span style={{fontSize: '1.25rem'}}>📱</span>
                <span>+1 (437) 219-3768</span>
              </li>
              <li className="contact-detail">
                <span style={{fontSize: '1.25rem'}}>📍</span>
                <span>Toronto, Ontario, Canada</span>
              </li>
            </ul>
          </div>
          
          {/* Contact Form */}
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="form-input form-textarea"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
                style={{width: '100%'}}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage