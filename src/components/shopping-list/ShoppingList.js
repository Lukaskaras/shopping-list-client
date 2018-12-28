import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { backendService } from '../../services/backendService'
import EnterItem from './EnterItem'
import { removeItem } from '../../store/actions/shoppingListActions'
import { connect } from 'react-redux'
import Favorites from './Favorites'

class ShoppingList extends Component {
  state = {
    listItems: [],
    isLoading: false
  }
  async componentDidMount() {
    this.setState({ isLoading: true})
    await this.loadItems()
    this.setState({ isLoading: false})
  }

  async loadItems() {
    const items = await backendService.getItems()
    this.setState({
      listItems: items
    })
  }

  handleClick = async (itemId) => {
    await this.props.removeItem(itemId)
    if (this.props.successfulDelete) {
      const newItems = this.state.listItems.filter(item => item._id !== itemId)
      this.setState({ listItems: newItems })
    }
  }
  render() {
    const authenticatedUser = localStorage.getItem('user')
    if (!authenticatedUser) {
      return <Redirect to='/login'/>
    }

    if (this.state.isLoading) {
      return <p className="center">Loading...</p>
    }
    const items = this.state.listItems.length ? this.state.listItems.map(item => {
      return(
        <li className="collection-item row shopping-list-item" key={ item._id }>
          <div className="col s1">
            <a href="javascript:void(0)">
              <i className="material-icons icon-black">star_border</i>
            </a>
          </div>
          <div className="col s11">
            <span>{item.name}</span>
            <a href="javascript:void(0)" className="secondary-content" onClick={() => this.handleClick(item._id)} >
              <i className="material-icons icon-black">delete</i>
            </a>
          </div>
        </li>
      )
    }) : <div className="center">No items</div>
    return (
      <div className="container main-container">
        <div className="row">
          <div className="col m9 s12 shopping-list">
            <ul className="collection">
              { items }
            </ul>
            <EnterItem loadItems={this.loadItems.bind(this)}/>
          </div>
         <div className="col m3 s12 white favorites">
           <Favorites/>
         </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shoppingList: state.shoppingList,
    successfulDelete: state.shoppingList.successfulDelete
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (itemId) => dispatch(removeItem(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)