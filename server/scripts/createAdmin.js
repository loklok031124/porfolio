import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/user.model.js';

const createAdmin = async () => {
  try {
    await mongoose.connect("mongodb+srv://loklok031124_db_user:9ry3DgvwJje27Byo@cluster0.e3captd.mongodb.net/porfolio");
    
    const admin = await User.create({
      name: 'Admin User Siu Jeff',
      email: 'admin1234567@porfolio.com',
      password: 'admin1234567',
      role: 'admin'
    });
    
    console.log('✅ Admin user created successfully');
    console.log('Email: admin123456@porfolio.com');
    console.log('Password: admin123456');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();