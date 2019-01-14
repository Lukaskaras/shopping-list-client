import { backendService } from '../../services/backendService'

export const addListItem = (itemInfo) => {
  return async (dispatch) => {
    try {
      const response = await backendService.postListItem(itemInfo)
      dispatch({ type: 'LIST_ITEM_ADDED'})
      return response
    } catch (error) {
      dispatch({ type: 'LIST_ITEM_ADD_ERROR'})
      console.log(error)
      return error
    }
  }
}

export const addItem = (itemName) => {
  return async (dispatch) => {
    try {
      const response = await backendService.postItem(itemName)
      dispatch({ type: 'ITEM_ADDED' })
      return response
    } catch (error) {
      dispatch({ type: 'ITEM_ADD_ERROR'})
      return error
    }
  }
}

export const removeListItem = (itemId) => {
  return async (dispatch) => {
    try {
      const response = await backendService.deleteListItem(itemId)
      dispatch({ type: 'ITEM_DELETED'})
      return response
    } catch (error) {
      dispatch({ type: 'ITEM_DELETE_ERROR'})
      return error
    }
  }
}

export const addFavorite = (itemInfo) => {
  return async (dispatch) => {
    try {
      const response = await backendService.postFavorite(itemInfo)
      dispatch({ type: 'FAVORITE_ADDED' })
      return response
    } catch {
      dispatch({ type: 'FAVORITE_ADD_ERROR' })
    }
  }
}

export const deleteFavorite = (itemId) => {
  return async (dispatch) => {
    try {
      const response = await backendService.deleteFavorite(itemId)
      dispatch({ type: 'FAVORITE_DELETED' })
      return response
    } catch {
      dispatch({ type: 'FAVORITE_DELETE_ERROR' })
    }
  }
}