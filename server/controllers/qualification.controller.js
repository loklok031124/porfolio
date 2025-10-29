/**
 * File: qualification.controller.js
 * Student Name: [Your Name]
 * Student ID: [Your ID]
 * Date: [Date]
 * Description: Controller functions for Qualification CRUD operations
 */

import Qualification from '../models/qualification.model.js';

// Get all qualifications
export const getAllQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ completion: -1 });
    res.status(200).json({
      success: true,
      count: qualifications.length,
      data: qualifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching qualifications',
      error: error.message
    });
  }
};

// Get qualification by ID
export const getQualificationById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    
    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: 'Qualification not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: qualification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching qualification',
      error: error.message
    });
  }
};

// Create new qualification
export const createQualification = async (req, res) => {
  try {
    const qualification = await Qualification.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Qualification created successfully',
      data: qualification
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating qualification',
      error: error.message
    });
  }
};

// Update qualification by ID
export const updateQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: 'Qualification not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Qualification updated successfully',
      data: qualification
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating qualification',
      error: error.message
    });
  }
};

// Delete qualification by ID
export const deleteQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndDelete(req.params.id);
    
    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: 'Qualification not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Qualification deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting qualification',
      error: error.message
    });
  }
};

// Delete all qualifications
export const deleteAllQualifications = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} qualifications deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting qualifications',
      error: error.message
    });
  }
};