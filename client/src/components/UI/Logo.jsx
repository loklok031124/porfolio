import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => (
  <Link to="/" className="logo">
    <div className="logo-icon">
      JS
    </div>
    <span className="logo-text">Jeff Siu</span>
  </Link>
)

export default Logo