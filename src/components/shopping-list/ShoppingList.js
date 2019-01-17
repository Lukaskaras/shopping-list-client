import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { backendService } from '../../services/backendService'
import EnterItem from './EnterItem'
import { addFavorite, removeListItem, deleteFavorite } from '../../store/actions/shoppingListActions'
import { connect } from 'react-redux'
import Favorites from './Favorites'


class ShoppingList extends Component {
  state = {
    listItems: [],
    isListItemsLoading: false,
    favorites: [],
    isFavoritesLoading: false
  }

  redirectUnauthorized = () => {
    const authenticatedUser = localStorage.getItem('user')
    if (!authenticatedUser) {
      this.props.history.push('/login')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // this.redirectUnauthorized()
  }

  async componentDidMount() {
    this.setState({ isListItemsLoading: true, isFavoritesLoading: true })
    await Promise.all([this.loadListItems(), this.loadFavorites()])
    this.setState({ isListItemsLoading: false, isFavoritesLoading: false})
  }

  async loadListItems() {
    try {
      const res = await backendService.getItems()
      const listItems = res.data
      if (listItems) {
        const listItems = res.data
        this.setState({
          listItems
        })
      }
    } catch (error) {
      this.redirectUnauthorized()
    }
  }

  async loadFavorites() {
    try {
      const response = await backendService.getFavorites()

      if (response) {
        const favorites = response.data
        this.setState({
          favorites
        })
      }
    } catch (error) {
      this.redirectUnauthorized()
    }
  }

  handleClickDelete = async (itemId) => {
    await this.props.removeListItem(itemId)
    if (this.props.successfulDelete) {
      const newItems = this.state.listItems.filter(item => item._id !== itemId)
      this.setState({ listItems: newItems })
    }
  }

  handleClickStar = async (listItem) => {
    for (const favorite of this.state.favorites) {
      if (favorite.item.itemId === listItem.item.itemId) {
        await this.props.deleteFavorite(favorite._id)
        await this.loadFavorites()
        return
      }
    }

    await this.props.addFavorite(listItem)
    await this.loadFavorites()
  }

  render() {
    const authenticatedUser = localStorage.getItem('user')
    if (!authenticatedUser) {
      return <Redirect to='/login'/>
    }

    if (this.state.isListItemsLoading) {
      return <p className="center">Loading...</p>
    }

    const items = this.state.listItems.length ? this.state.listItems.map(listItem => {
      const icon = this.state.favorites.some(favorite => favorite.item.name === listItem.item.name) ?
        <i className="material-icons icon-black">star</i> :
        <i className="material-icons icon-black">star_border</i>
      return(
        <li className="collection-item row item" key={ listItem._id }>
          <div className="col s2 m1">
            <a href="javascript:void(0)" onClick={() => this.handleClickStar(listItem)}>
              { icon }
            </a>
          </div>
          <div className="col s8 m10">
            <span>{listItem.item.name}</span>
          </div>
          <div className="col s1 m1">
            <a href="javascript:void(0)" onClick={() => this.handleClickDelete(listItem._id)} >
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
            <EnterItem loadListItems={this.loadListItems.bind(this)} listItems={this.state.listItems} />
          </div>
         <div className="col m3 s12 white favorites container z-depth-1">
           <Favorites
             favorites={this.state.favorites}
             isLoading={this.state.isFavoritesLoading}
             loadListItems={this.loadListItems.bind(this)}
             listItems={this.state.listItems}
             loadFavorites={this.loadFavorites.bind(this)}
           />
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
    removeListItem: (itemId) => dispatch(removeListItem(itemId)),
    addFavorite: (itemInfo) => dispatch(addFavorite(itemInfo)),
    deleteFavorite: (itemId) => dispatch(deleteFavorite(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)