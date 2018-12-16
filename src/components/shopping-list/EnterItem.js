import React, { Component } from 'react'

class EnterItem extends Component {
  state = {
    name: '',
    quantity: 1
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    console.log(this.state)
  }
  render () {
    return (
      <form className="white" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Add item</label>
        <input type="text" id="name" onChange={this.handleChange}/>
      </form>
    )
  }
}

export default EnterItem