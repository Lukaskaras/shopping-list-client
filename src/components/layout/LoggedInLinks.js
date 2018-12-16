import React from 'react'
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/actions/authActions'
import { connect } from 'react-redux'

const LoggedInLinks = (props) => {
  return(
    <ul className="right">
      <li><a href="#" onClick={props.logout}>Log Out</a></li>
      <li><NavLink to='/'>User</NavLink></li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(LoggedInLinks)