import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getItems } from '../../services/backendService'
import EnterItem from './EnterItem'

class ShoppingList extends Component {
  state = {
    listItems: [],
    isLoading: false
  }
  async componentDidMount() {
    console.log('bllll')
    this.setState({ isLoading: true})
    const items = await getItems()
    console.log(localStorage.getItem('user'))
    console.log(items)
    this.setState({
      listItems: items,
      isLoading: false
    })
  }
  render() {
    const authenticatedUser = localStorage.getItem('user')
    if (!authenticatedUser) {
      return <Redirect to='/login'/>
    }

    if (this.state.isLoading) {
      return <p className="center">Loading...</p>
    }

    const items = this.state.listItems ? this.state.listItems.map(item => {
      return(
        <li className="collection-item" key={ item._id }>{item.name}</li>
      )
    }) : <div className="center">No items</div>
    return (
      <div className="container shopping-list">
        <ul className="collection">
          {items}
        </ul>
        <EnterItem/>
      </div>
    )
  }
}

export default ShoppingList