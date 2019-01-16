import React from 'react'
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/actions/authActions'
import { connect } from 'react-redux'

const LoggedInLinks = (props) => {
  return(
    <div>
      <ul className="right hide-on-med-and-down">
        <li><a href="#" onClick={props.logout}>Log Out</a></li>
        <li><NavLink to='/'>User</NavLink></li>
      </ul>
      <ul className="sidenav" id="mobile-links">
        <li><a href="#" className="sidenav-close" onClick={props.logout}>Log Out</a></li>
        <li><NavLink to='/' className="sidenav-close">User</NavLink></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(LoggedInLinks)