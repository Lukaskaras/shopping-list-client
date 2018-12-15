import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ShoppingList extends Component {
  render() {
    const authenticatedUser = localStorage.getItem('user')
    if (!authenticatedUser) {
      return <Redirect to='/login'/>
    }
    return (
      <div className="container shopping-list">
        <ul className="collection">
          <li className="collection-item">Alvin</li>
          <li className="collection-item">Melvin</li>
        </ul>
      </div>
    )
  }
}

export default ShoppingList