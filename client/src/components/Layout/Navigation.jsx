/**
 * File name: Navigation.jsx
 * Student's Name: [Your Name]
 * Student ID: [Your Student ID]
 * Date: [Current Date]
 * Description: Navigation component with React Router integration
 */

import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, User, FolderOpen, Settings, Mail, Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About Me', icon: User },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    { path: '/services', label: 'Services', icon: Settings },
    { path: '/contact', label: 'Contact', icon: Mail }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="nav-desktop">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${isActive(path) ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="nav-mobile">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="nav-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div className="nav-mobile-menu">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`nav-mobile-link ${isActive(path) ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Navigation