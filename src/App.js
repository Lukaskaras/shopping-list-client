import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import ShoppingList from './components/shopping-list/ShoppingList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <ShoppingList/>
      </div>
    )
  }
}

export default App
