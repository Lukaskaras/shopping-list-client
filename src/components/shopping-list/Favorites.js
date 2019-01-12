import React, { Component } from 'react'
import { addListItem, deleteFavorite } from '../../store/actions/shoppingListActions'
import { connect } from 'react-redux'

class Favorites extends Component {
  handleAddClick = async (item) => {
    const newListItem = {
      name: item.item.name,
      _id: item.item.itemId,
      quantity: 1
    }
    if (this.props.listItems.some(listItem => listItem.item.name === newListItem.name)) {
      return
    }
    await this.props.addListItem(newListItem)
    await this.props.loadListItems()
  }

  handleDeleteClick = async (item) => {
    await this.props.deleteFavorite(item._id)
    await this.props.loadFavorites()
  }

  render () {
    if (this.props.isLoading) {
      return <p className="center">Loading...</p>
    }

    const favorites = this.props.favorites.length ? this.props.favorites.map(favorite => {
      return(
        <li className="collection-item row item" key={ favorite.item._id }>
          <div className="col s2">
            <a href="javascript:void(0)" onClick={() => this.handleAddClick(favorite)}>
              <i className="material-icons icon-black">add_circle</i>
            </a>
          </div>
          <div className="col s8">
            <span>{favorite.item.name}</span>
          </div>
          <div className="col s1">
            <a href="javascript:void(0)" onClick={() => this.handleDeleteClick(favorite)}>
              <i className="material-icons icon-black">delete</i>
            </a>
          </div>
        </li>
      )
    }) : <div className="center">No items</div>
    return (
      <div>
        <h5 className="center">Favorites</h5>
        <ul className="collection">
          { favorites }
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addListItem: (itemInfo) => dispatch(addListItem(itemInfo)),
    deleteFavorite: (itemId) => dispatch(deleteFavorite(itemId))
  }
}

export default connect(null, mapDispatchToProps)(Favorites)