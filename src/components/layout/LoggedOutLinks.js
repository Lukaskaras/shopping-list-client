import React from 'react'
import { NavLink } from 'react-router-dom'

const LoggedOutLinks = () => {
  return(
    <div>
      <ul className="right hide-on-med-and-down">
        <li><NavLink to='/login'>Log In</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li>
      </ul>
      <ul className="sidenav" id="mobile-links">
        <li ><NavLink className="sidenav-close" to='/login'>Log In</NavLink></li>
        <li><NavLink className="sidenav-close" to='/register'>Register</NavLink></li>
      </ul>
    </div>

  )
}

export default LoggedOutLinks