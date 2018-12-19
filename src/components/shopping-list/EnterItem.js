import React, { Component } from 'react'
import { addItem } from '../../store/actions/shoppingListActions'
import { connect } from 'react-redux'

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
  handleSubmit = async (e) => {
    e.preventDefault()
    if (this.state.name.length > 1) {
      await this.props.addItem(this.state)
      this.setState({ name: '' })
      this.nameInput.value = ''
      await this.props.loadItems()
    }
  }
  componentDidMount = () => {
    this.nameInput.focus()
  }
  render () {
    return (
      <form className="white" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Add item</label>
        <input type="text" id="name" autoComplete="off" onChange={this.handleChange} ref={(input) => { this.nameInput = input }}/>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shoppingList: state.shoppingList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (itemInfo) => dispatch(addItem(itemInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterItem)