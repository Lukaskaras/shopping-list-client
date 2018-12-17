import { backendService } from '../../services/backendService'

export const addItem = (itemInfo) => {
  return async (dispatch) => {
    try {
      await backendService.postItem(itemInfo)
      dispatch({ type: 'ITEM_ADDED'})
    } catch {
      dispatch({ type: 'ITEM_ADD_ERROR'})
    }
  }
}

export const removeItem = (itemId) => {
  return async (dispatch) => {
    try {
      await backendService.deleteItem(itemId)
      dispatch({ type: 'ITEM_DELETED'})
    } catch {
      dispatch({ type: 'ITEM_DELETE_ERROR'})
    }
  }
}