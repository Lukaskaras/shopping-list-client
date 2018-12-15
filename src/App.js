import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ShoppingList from './components/shopping-list/ShoppingList'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={ShoppingList}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
