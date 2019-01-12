import { backendService } from '../../services/backendService'

export const addListItem = (itemInfo) => {
  return async (dispatch) => {
    try {
      await backendService.postListItem(itemInfo)
      dispatch({ type: 'LIST_ITEM_ADDED'})
    } catch {
      dispatch({ type: 'LIST_ITEM_ADD_ERROR'})
    }
  }
}

export const addItem = (itemName) => {
  return async (dispatch) => {
    try {
      const response = await backendService.postItem(itemName)
      dispatch({ type: 'ITEM_ADDED' })
      return response
    } catch {
      dispatch({ type: 'ITEM_ADD_ERROR'})
    }
  }
}

export const removeListItem = (itemId) => {
  return async (dispatch) => {
    try {
      await backendService.deleteListItem(itemId)
      dispatch({ type: 'ITEM_DELETED'})
    } catch {
      dispatch({ type: 'ITEM_DELETE_ERROR'})
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