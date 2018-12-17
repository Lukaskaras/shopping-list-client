import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class Register extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  }
  handleChange = (e) => {
    console.log(this.props.auth)
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.register(this.state)
  }
  render () {
    const authenticatedUser = localStorage.getItem('user')
    if (authenticatedUser) {
      return <Redirect to='/'/>
    }
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Register</h5>
          <div className="input-field">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn red lighten-1 z-depth-0">Register</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (newUser) => dispatch(register(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)