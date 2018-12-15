import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="nav-wrapper red lighten-1">
      <div className="container">
        <Link to={'/'} className="brand-logo center">Shopping List</Link>
      </div>
    </nav>
  )
}

export default Navbar