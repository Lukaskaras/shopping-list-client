import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { backendService } from '../../services/backendService'
import EnterItem from './EnterItem'
import { removeItem } from '../../store/actions/shoppingListActions'
import { connect } from 'react-redux'

class ShoppingList extends Component {
  state = {
    listItems: [],
    isLoading: false
  }
  async componentDidMount() {
    this.setState({ isLoading: true})
    const items = await backendService.getItems()
    this.setState({
      listItems: items,
      isLoading: false
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
        <li className="collection-item" key={ item._id }>
          <div>{item.name}
            <a href="javascript:void(0)" className="secondary-content" onClick={() => this.handleClick(item._id)} >
              <i className="material-icons icon-black">delete</i>
            </a>
          </div>
        </li>
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