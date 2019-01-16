import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'
import M from 'materialize-css'

class Navbar extends Component {
  componentDidMount() {
    const elem = document.querySelector('.sidenav')
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    })
  }

  render() {
    const authenticatedUser = localStorage.getItem('user')
    const links = authenticatedUser ? <LoggedInLinks/> : <LoggedOutLinks/>
    return (
      <nav className="nav-wrapper red lighten-1">
        <div className="container">
          <Link to={'/'} className="brand-logo center">Shopping List</Link>
          <a href="#" className="sidenav-trigger hide-on-large-only" data-target="mobile-links">
            <i className="material-icons">menu</i>
          </a>
          { links }
        </div>
      </nav>
    )
}
}

export default Navbar