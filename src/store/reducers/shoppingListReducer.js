const initState = {}

const shoppingListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LIST_ITEM_ADDED':
    case 'LIST_ITEM_ADD_ERROR':
    case 'ITEM_ADDED':
    case 'ITEM_ADD_ERROR':
    case 'FAVORITE_ADDED':
    case 'FAVORITE_ADD_ERROR':
    case 'FAVORITE_DELETED':
    case 'FAVORITE_DELETE_ERROR':
      console.log(action.type)
      return state
    case 'ITEM_DELETED':
      console.log('ITEM DELETED')
      return {
        ...state,
        successfulDelete: true
      }
    case 'ITEM_DELETE_ERROR':
      console.log('ITEM_DELETE_ERROR')
      return {
        ...state,
        successfulDelete: false
      }
    default:
      return state
  }
}

export default shoppingListReducer