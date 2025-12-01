/**
 * File: AdminDashboard.jsx
 * Description: Admin dashboard with tabs for managing all resources
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ContactList from './ContactList';
import ProjectList from './ProjectList';
import QualificationList from './QualificationList';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('contacts');

  const tabs = [
    { id: 'contacts', label: 'Contacts' },
    { id: 'projects', label: 'Projects' },
    { id: 'qualifications', label: 'Qualifications' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
          <h1>Admin Dashboard</h1>
          <p style={{ color: '#6b7280' }}>Welcome back, {user?.name}!</p>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs" style={{ 
          display: 'flex', 
          gap: '1rem', 
          borderBottom: '2px solid #e5e7eb',
          marginBottom: '2rem'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #3b82f6' : '3px solid transparent',
                color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                fontWeight: activeTab === tab.id ? '600' : '400',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="dashboard-content">
          {activeTab === 'contacts' && <ContactList />}
          {activeTab === 'projects' && <ProjectList />}
          {activeTab === 'qualifications' && <QualificationList />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;