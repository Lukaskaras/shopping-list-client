import React from 'react'
import { NavLink } from 'react-router-dom'

const LoggedOutLinks = () => {
  return(
    <ul className="right">
      <li><NavLink to='/login'>Log In</NavLink></li>
      <li><NavLink to='/register'>Register</NavLink></li>
    </ul>
  )
}

export default LoggedOutLinks