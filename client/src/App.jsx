import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import HomePage from './components/Pages/HomePage'
import AboutPage from './components/Pages/AboutPage'
import ProjectsPage from './components/Pages/ProjectsPage'
import ServicesPage from './components/Pages/ServicesPage'
import ContactPage from './components/Pages/ContactPage'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App