/**
 * File: Navigation.jsx
 * Description: Updated navigation with authentication links
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, FolderOpen, Settings, Mail, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, signout, user } = useAuth();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About Me', icon: User },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    { path: '/services', label: 'Services', icon: Settings },
    { path: '/contact', label: 'Contact', icon: Mail }
  ];

  const isActive = (path) => location.pathname === path;

  const handleSignOut = async () => {
    await signout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

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
        
        {/* Auth Links */}
        {isAuthenticated ? (
          <>
            {isAdmin() && (
              <Link
                to="/admin/dashboard"
                className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
            <span style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: '1rem' }} className='username'>
              {user?.name}
            </span>
          </>
        ) : (
          <>
            <Link to="/signin" className="nav-link">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>
              Sign Up
            </Link>
          </>
        )}
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
            
            {/* Mobile Auth Links */}
            {isAuthenticated ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`nav-mobile-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                  >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="nav-mobile-link"
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none' }}
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
                <div style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                  Logged in as: {user?.name}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-mobile-link"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-mobile-link"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;