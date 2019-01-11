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
    await this.loadListItems()
    this.setState({ isLoading: false})
  }

  async loadListItems() {
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
    console.log(this.state)
    const items = this.state.listItems.length ? this.state.listItems.map(listItem => {
      return(
        <li className="collection-item row shopping-list-item" key={ listItem._id }>
          <div className="col s1">
            <a href="javascript:void(0)">
              <i className="material-icons icon-black">star_border</i>
            </a>
          </div>
          <div className="col s11">
            <span>{listItem.item.name}</span>
            <a href="javascript:void(0)" className="secondary-content" onClick={() => this.handleClick(listItem._id)} >
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
            <ul className="collection z-depth-1">
              { items }
            </ul>
            <EnterItem loadListItems={this.loadListItems.bind(this)}/>
          </div>
         <div className="col m3 s12 white favorites z-depth-1">
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