/**
 * File: ContactPage.jsx
 * Description: Updated contact page with ContactForm component
 */

import React from 'react';
import { Mail } from 'lucide-react';
import ContactForm from '../Forms/ContactForm';

const ContactPage = () => (
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
              <span>john.doe@email.com</span>
            </li>
            <li className="contact-detail">
              <span style={{fontSize: '1.25rem'}}>📱</span>
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="contact-detail">
              <span style={{fontSize: '1.25rem'}}>📍</span>
              <span>Toronto, Ontario, Canada</span>
            </li>
          </ul>
        </div>
        
        {/* Contact Form */}
        <div className="contact-form">
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
);

export default ContactPage;