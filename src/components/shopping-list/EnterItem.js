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
      <div className="row">
        <form className="white" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col l12 m11 s9">
              <label htmlFor="name">Add item</label>
              <input type="text" id="name" autoComplete="off" onChange={this.handleChange} ref={(input) => { this.nameInput = input }}/>
            </div>
            <div className="input-field prefix col s1 m1 hide-on-large-only submit-button">
              <button className="btn white" type="submit">
                <i className="material-icons icon-black">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
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