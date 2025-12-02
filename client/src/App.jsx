import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Lazy load components
const HomePage = lazy(() => import('./components/Pages/HomePage'));
const AboutPage = lazy(() => import('./components/Pages/AboutPage'));
const ProjectsPage = lazy(() => import('./components/Pages/ProjectsPage'));
const ServicesPage = lazy(() => import('./components/Pages/ServicesPage'));
const ContactPage = lazy(() => import('./components/Pages/ContactPage'));
const SignUp = lazy(() => import('./components/Auth/SignUp'));
const SignIn = lazy(() => import('./components/Auth/SignIn'));
const AdminDashboard = lazy(() => import('./components/Dashboard/AdminDashboard'));
const ProtectedRoute = lazy(() => import('./components/Auth/ProtectedRoute'));

// Loading component
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '60vh' 
  }}>
    <div>Loading...</div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Header />
        
        <main>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;