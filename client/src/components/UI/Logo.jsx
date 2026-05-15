import React from 'react'
import { Link } from 'react-router-dom'
import { Terminal } from 'lucide-react'

const Logo = () => (
  <Link to="/" className="logo">
    <Terminal size={24} className="logo-icon-stroke" strokeWidth={2.5} />
    <span className="logo-command">
      <span className="logo-prompt">cd</span>
      <span className="logo-cmd-text">js-home</span>
      <span className="logo-cursor">▋</span>
    </span>
  </Link>
)

export default Logo