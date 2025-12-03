import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compress from "compression";
import helmet from "helmet";

import contactRoutes from './server/routes/contact.routes.js';
import projectRoutes from './server/routes/project.routes.js';
import qualificationRoutes from './server/routes/qualification.routes.js';
import authRoutes from './server/routes/auth.routes.js';
import config from './config/config.js';
import userRoutes from "./server/routes/user.routes.js";

const app = express();

// CORS
const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:3001'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());

// Connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📦 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};
connectDB();

// API root
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Portfolio Application Backend API',
  });
});

// API routes
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// ------------------------------------------------------
// ** SERVE FRONTEND IN PRODUCTION — MUST BE ABOVE ERRORS **
// ------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'client/dist');

  console.log("🔥 Production block reached. Serving frontend...");
  console.log("DIST path:", distPath);

  // Serve static files
  app.use(express.static(distPath));

  // SPA fallback
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ------------------------------------------------------
// ** ERROR HANDLERS — MUST BE LAST **
// ------------------------------------------------------

// Standard error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: config.env === 'development' ? err.message : {}
  });
});

// 404 should be the last route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Unauthorized error handler
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else {
    next(err);
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${process.env.CLIENT_URL}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
});

export default app;
