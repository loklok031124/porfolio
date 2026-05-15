/**
 * File: project.model.js
 * Student Name: [Your Name]
 * Student ID: [Your Student ID]
 * Date: [Current Date]
 * Description: Updated Mongoose model for Project collection with detailed fields
 */

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    default: 'Developer'
  },
  outcome: {
    type: String,
    required: [true, 'Outcome is required'],
    trim: true
  },
  tech: {
    type: [String],
    required: [true, 'Technologies are required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one technology is required'
    }
  },
  demoUrl: {
    type: String,
    trim: true,
    default: '#'
  },
  githubUrl: {
    type: String,
    trim: true,
    default: '#'
  },
  completion: {
    type: Date,
    required: [true, 'Completion date is required']
  },
  // Optional fields for additional info
  firstname: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;