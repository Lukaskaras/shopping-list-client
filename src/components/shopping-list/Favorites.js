import React, { Component } from 'react'

class Favorites extends Component {
  // async componentDidMount () {
  //   this.setState({ isLoading: true})
  //   await this.loadFavorites()
  //   this.setState({ isLoading: false})
  // }

  // async loadFavorites() {
  //   const favorites = await backendService.getFavorites()
  //   this.setState({
  //     favorites
  //   })
  // }

  render () {
    if (this.props.isLoading) {
      return <p className="center">Loading...</p>
    }

    const favorites = this.props.favorites.length ? this.props.favorites.map(favorite => {
      return(
        <li className="collection-item" key={ favorite.item._id }>
          <span>{favorite.item.name}</span>
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