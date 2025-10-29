
import React from 'react'
import { Globe, Smartphone, Database, Code } from 'lucide-react'

const ServicesPage = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern frameworks and best practices.",
      icon: Globe,
      features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "Cross-browser Compatibility"]
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      icon: Smartphone,
      features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"]
    },
    {
      title: "Backend Development",
      description: "Robust server-side solutions, APIs, and database management systems.",
      icon: Database,
      features: ["RESTful APIs", "Database Design", "Cloud Integration", "Security Implementation"]
    },
    {
      title: "Custom Software Solutions",
      description: "Tailored software solutions to meet specific business requirements and workflows.",
      icon: Code,
      features: ["Business Analysis", "Custom Development", "System Integration", "Maintenance & Support"]
    }
  ]

  return (
    <div className="services-page">
      <div className="container">
        <h1 className="text-center mb-6">Services I Offer</h1>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-header">
                <div className="service-icon">
                  <service.icon size={32} />
                </div>
                <h3 className="service-title">{service.title}</h3>
              </div>
              
              <p className="service-description">{service.description}</p>
              
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="service-feature">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesPage