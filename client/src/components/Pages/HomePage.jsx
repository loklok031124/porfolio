import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => (
  <div className="home-hero">
    <div className="container">
      <div className="home-content">
        <div className="home-mission animate-slide-up mb-8">
          <h2 className="mb-2">Mission Statement</h2>
          <p>
            I am passionate about creating innovative digital solutions that bridge the gap between 
            complex technology and user-friendly experiences. My mission is to develop robust, 
            scalable applications that solve real-world problems while continuously learning and 
            adapting to emerging technologies in the ever-evolving digital landscape.
          </p>
        </div>

        <div className="home-buttons">
          <Link to="/about" className="btn btn-primary">
            Learn About Me
          </Link>
          <Link to="/projects" className="btn btn-secondary">
            View My Work
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default HomePage