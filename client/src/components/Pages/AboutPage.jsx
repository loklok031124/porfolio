/**
 * File: AboutPage.jsx
 * Student Name: [Your Name]
 * Student ID: [Your Student ID]
 * Date: [Current Date]
 * Description: About Me page with education timeline
 import React from 'react'
import { User, Download } from 'lucide-react'

const AboutPage = () => (
  <div className="about-page">
    <div className="container">
      <div className="about-content">
        <h1 className="text-center mb-6">About Me</h1>
        
        <div className="about-card">
          <div className="about-profile">
            <div className="about-avatar">
              <img src="/images/profile.png" alt="Jeff Siu" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} /> 

            </div>
            <h2 className="about-name">Jeff Siu</h2>
            <p className="about-title">Junior Full-stack Developer</p>
          </div>
          
          <div className="about-bio">
            <h3>I'm Jeff!</h3>
            <p>
              I am a passionate junior developer in creating innovative web applications and mobile 
              solutions and with 4 years experience in consturction project management. My journey in technology began 
              during my software engineering studies, where I discovered my love for problem-solving 
              through code. I specialize in React, Node.js, modern web technologies and .net framework 
              and always striving to deliver exceptional user experiences.
            </p>
            
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or enjoying outdoor activities. I believe in continuous 
              learning and am always excited to take on new challenges that push the boundaries 
              of what's possible in software development.
            </p>
            
            <a 
              href="/documents/resume.pdf" 
              download="Jeff_Siu_Resume.pdf"
              className="btn btn-primary"
              style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}
            >
              <Download size={20} />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default AboutPage
 */

import React, { useState, useEffect } from 'react';
import { User, Download, GraduationCap, Calendar } from 'lucide-react';
import { qualificationAPI } from '../../api/qualification.api';

const AboutPage = () => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      const response = await qualificationAPI.getAll();
      // Sort by completion date (newest first)
      const sortedQualifications = response.data.sort((a, b) => 
        new Date(b.completion) - new Date(a.completion)
      );
      setQualifications(sortedQualifications);
    } catch (error) {
      console.error('Failed to fetch qualifications:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">

          
          {/* Profile Card */}
          <div className="about-card">
            <div className="about-profile">
              <div className="about-avatar">
                <User size={80} style={{color: 'rgba(255, 255, 255, 0.8)'}} />
              </div>
              <h2 className="about-name">Chun Lok Siu</h2>
              <p className="about-title">Junior Full Stack Developer</p>
            </div>
            
            <div className="about-bio">
              <h3>Hello, I'm Jeff!</h3>
              <p>
                I am a passionate software developer in creating innovative web applications 
                and mobile solutions. My journey in technology began from my exposure to programming while 
                working as a BIM modeler. I started studying software 
                engineering in Canada and discovered my love for automation and problem-solving 
                through code, and always striving to deliver exceptional user experiences.
              </p>
              

              
              <a 
                href="/documents/resume.pdf" 
                download="Jeff_Siu_Resume.pdf"
                className="btn btn-primary"
                style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}
              >
                <Download size={20} />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Education Timeline */}
          <div style={{ marginTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <GraduationCap size={32} style={{ color: '#3b82f6' }} />
                <h2 style={{ margin: 0 }}>Education & Qualifications</h2>
              </div>
              <p style={{ color: '#6b7280', maxWidth: '700px', margin: '0 auto' }}>
                My academic journey and professional certifications that have shaped my career
              </p>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: '#6b7280' }}>Loading qualifications...</p>
              </div>
            ) : qualifications.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                <GraduationCap size={48} style={{ color: '#d1d5db', margin: '0 auto 1rem' }} />
                <p style={{ color: '#6b7280' }}>No qualifications added yet</p>
              </div>
            ) : (
              <div className="timeline timeline-centered">
                {qualifications.map((qual, index) => (
                  <div key={qual._id || index} className="timeline-item">
                    {/* Timeline dot and line */}
                    <div className="timeline-marker">
                      <div className="timeline-dot"></div>
                      {index !== qualifications.length - 1 && (
                        <div className="timeline-line"></div>
                      )}
                    </div>

                    {/* Timeline content */}
                    <div className="timeline-content">
                      <div className="timeline-date">
                        <Calendar size={16} />
                        <span>{new Date(qual.completion).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long' 
                        })}</span>
                      </div>
                      
                      <div className="timeline-card">
                        <h3 className="timeline-title">{qual.title}</h3>
                        <p className="timeline-description">{qual.description}</p>
                        
                        {(qual.firstname || qual.lastname) && (
                          <div className="timeline-meta">
                            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                              {qual.firstname} {qual.lastname}
                            </p>
                          </div>
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
    </div>
  );
};

export default AboutPage;


