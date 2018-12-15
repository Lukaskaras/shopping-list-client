import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../store/actions/authActions'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.state)
  }
  render () {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Login</h5>
          <div className="input-field">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn red lighten-1 z-depth-0">Login</button>
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
    login: (credentials) => dispatch(login(credentials))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)