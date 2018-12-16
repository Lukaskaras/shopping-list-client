import { postItem } from '../../services/backendService'

export const addItem = (itemInfo) => {
  return async (dispatch) => {
    try {
      await postItem(itemInfo)
      dispatch({ type: 'ITEM_ADDED'})
    } catch {
      dispatch({ type: 'ITEM_ADD_ERROR'})
    }
  }
}