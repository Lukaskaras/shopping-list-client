import React, { Component } from 'react'
import { backendService } from '../../services/backendService'

class Favorites extends Component {
  state = {
    favorites: [],
    isLoading: false
  }
  async componentDidMount () {
    this.setState({ isLoading: true})
    await this.loadFavorites()
    this.setState({ isLoading: false})
  }

  async loadFavorites() {
    const favorites = await backendService.getFavorites()
    this.setState({
      favorites
    })
  }

  render () {
    if (this.state.isLoading) {
      return <p className="center">Loading...</p>
    }

    const favorites = this.state.favorites.length ? this.state.favorites.map(favorite => {
      return(
        <li className="collection-item" key={ favorite._id }>
          <span>{favorite.name}</span>
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

export default Favorites