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
    console.log(e)
    console.log(this.state)
    await this.props.addItem(this.state)

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