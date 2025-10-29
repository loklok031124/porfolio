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
              {/* <User size={80} style={{color: 'rgba(255, 255, 255, 0.8)'}} />*/}
            </div>
            <h2 className="about-name">Jeff Siu</h2>
            <p className="about-title">Junior Full-stack Developer</p>
          </div>
          
          <div className="about-bio">
            <h3>I'm Jeff!</h3>
            <p>
              I am a passionate junior developer in creating innovative web applications and mobile 
              solutions and with 4 years experience in project management. My journey in technology began 
              during my software engineering studies, where I discovered my love for problem-solving 
              through code. I specialize in React, Node.js, modern web technologies and .net framework 
              and always striving to deliver exceptional user experiences.
            </p>
            
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or enjoying outdoor activities. I believe in continuous 
              learning and am always excited to take on new challenges that push the boundaries 
              of what's possible in web development.
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