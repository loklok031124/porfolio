import React from 'react'
import Logo from '../UI/Logo'
import Navigation from './Navigation'

const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header-content">
        <Logo />
        <Navigation />
      </div>
    </div>
  </header>
)

export default Header