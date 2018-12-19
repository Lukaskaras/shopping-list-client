import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register, login } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { emailIsValid } from '../../helpers/validation'

class Register extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    registrationError: '',
    authError: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  validateRegisterForm = () => {
    if (!emailIsValid(this.state.email)) {
      this.setState({ registrationError: 'Please enter valid e-mail'})
    } else if (this.state.password.length < 8) {
      this.setState({ registrationError: 'Password needs to have at least 8 characters'})
    } else if (this.state.name.length === 0) {
      this.setState({registrationError: 'Please enter name'})
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    await this.setState({ registrationError: '' })
    this.validateRegisterForm()
    if (!this.state.registrationError) {
      await this.props.register(this.state)
      if (this.props.registrationError) {
        this.setState({registrationError: this.props.registrationError})
      } else {
        const user = {
          email: this.state.email,
          password: this.state.password
        }
        await this.props.login(user)
        this.setState({ registrationError: '' })
      }
    }
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
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn red lighten-1 z-depth-0">Register</button>
            <div className='red-text center'>
              { this.state.registrationError ? <p>{ this.state.registrationError }</p> : null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    registrationError: state.auth.registrationError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (newUser) => dispatch(register(newUser)),
    login: (credentials) => dispatch(login(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)