/**
 * File: QualificationList.jsx
 * Description: Qualification list with CRUD operations
 */

import React, { useState, useEffect } from 'react';
import { qualificationAPI } from '../../api/qualification.api';
import { useAuth } from '../../context/AuthContext';
import QualificationForm from '../Forms/QualificationForm';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const QualificationList = () => {
  const { isAdmin } = useAuth();
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingQualification, setEditingQualification] = useState(null);
  const [viewingQualification, setViewingQualification] = useState(null);

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      setLoading(true);
      const response = await qualificationAPI.getAll();
      setQualifications(response.data);
    } catch (error) {
      setError('Failed to fetch qualifications');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingQualification(null);
    setShowForm(true);
  };

  const handleEdit = (qualification) => {
    setEditingQualification(qualification);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this qualification?')) {
      return;
    }

    try {
      await qualificationAPI.delete(id);
      setQualifications(qualifications.filter(q => q._id !== id));
      alert('Qualification deleted successfully');
    } catch (error) {
      alert('Failed to delete qualification');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingQualification(null);
    fetchQualifications();
    alert(editingQualification ? 'Qualification updated successfully' : 'Qualification created successfully');
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingQualification(null);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading qualifications...</div>;
  }

  if (error) {
    return <div style={{ color: '#ef4444', padding: '2rem' }}>{error}</div>;
  }

  return (
    <div className="qualification-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Qualifications ({qualifications.length})</h2>
        {isAdmin() && (
          <button 
            onClick={handleAdd}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={18} />
            Add Qualification
          </button>
        )}
      </div>

      {showForm && (
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>
            {editingQualification ? 'Edit Qualification' : 'Add New Qualification'}
          </h3>
          <QualificationForm 
            qualification={editingQualification}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </div>
      )}

      {qualifications.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: '#6b7280' }}>No qualifications found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {qualifications.map(qualification => (
            <div key={qualification._id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{qualification.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {qualification.firstname} {qualification.lastname}
                  </p>
                  <p style={{ color: '#374151', marginTop: '0.5rem' }}>
                    {qualification.description?.substring(0, 150)}...
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    Completed: {new Date(qualification.completion).toLocaleDateString()}
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setViewingQualification(qualification)}
                    style={{
                      padding: '0.5rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer'
                    }}
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  
                  {isAdmin() && (
                    <>
                      <button
                        onClick={() => handleEdit(qualification)}
                        style={{
                          padding: '0.5rem',
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer'
                        }}
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(qualification._id)}
                        style={{
                          padding: '0.5rem',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer'
                        }}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewingQualification && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setViewingQualification(null)}>
          <div className="card" style={{
            maxWidth: '600px',
            width: '90%',
            padding: '2rem',
            maxHeight: '80vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1rem' }}>{viewingQualification.title}</h2>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Name:</strong> {viewingQualification.firstname} {viewingQualification.lastname}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Email:</strong> {viewingQualification.email}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Completion Date:</strong> {new Date(viewingQualification.completion).toLocaleDateString()}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Description:</strong>
              <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{viewingQualification.description}</p>
            </div>
            <button 
              onClick={() => setViewingQualification(null)}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualificationList;