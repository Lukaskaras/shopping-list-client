import React from 'react'
import { Link } from 'react-router-dom'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'

const Navbar = () => {
  const authenticatedUser = localStorage.getItem('user')
  const links = authenticatedUser ? <LoggedInLinks/> : <LoggedOutLinks/>
  return (
    <nav className="nav-wrapper red lighten-1">
      <div className="container">
        <Link to={'/'} className="brand-logo center">Shopping List</Link>
        { links }
      </div>
    </nav>
  )
}

export default Navbar