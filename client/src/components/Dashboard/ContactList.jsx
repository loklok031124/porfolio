/**
 * File: ContactList.jsx
 * Description: Contact list with CRUD operations (Admin only)
 */

import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../api/contact.api';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Eye } from 'lucide-react';

const ContactList = () => {
  const { isAdmin } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      setError('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      await contactAPI.delete(id);
      setContacts(contacts.filter(c => c._id !== id));
      alert('Contact deleted successfully');
    } catch (error) {
      alert('Failed to delete contact');
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading contacts...</div>;
  }

  if (error) {
    return <div style={{ color: '#ef4444', padding: '2rem' }}>{error}</div>;
  }

  return (
    <div className="contact-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Contact Messages ({contacts.length})</h2>
      </div>

      {contacts.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: '#6b7280' }}>No contacts found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {contacts.map(contact => (
            <div key={contact._id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>
                    {contact.firstname} {contact.lastname}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {contact.email}
                  </p>
                  <p style={{ color: '#374151', marginTop: '0.5rem' }}>
                    {contact.message?.substring(0, 100)}...
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleView(contact)}
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
                    <button
                      onClick={() => handleDelete(contact._id)}
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
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {selectedContact && (
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
        }} onClick={closeModal}>
          <div className="card" style={{
            maxWidth: '600px',
            width: '90%',
            padding: '2rem',
            maxHeight: '80vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1rem' }}>Contact Details</h2>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Name:</strong> {selectedContact.firstname} {selectedContact.lastname}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Email:</strong> {selectedContact.email}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Message:</strong>
              <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{selectedContact.message}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Received:</strong> {new Date(selectedContact.createdAt).toLocaleString()}
            </div>
            <button 
              onClick={closeModal}
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

export default ContactList;