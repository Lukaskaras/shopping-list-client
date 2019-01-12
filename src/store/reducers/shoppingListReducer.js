const initState = {}

const shoppingListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LIST_ITEM_ADDED':
      console.log('LIST_ITEM_ADDED')
      return state
    case 'LIST_ITEM_ADD_ERROR':
      console.log('LIST_ITEM_ADD_ERROR')
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
    case 'ITEM_ADDED':
      console.log('ITEM_ADDED')
      return state
    case 'ITEM_ADD_ERROR':
      console.log('ITEM_ADD_ERROR')
      return state
    case 'FAVORITE_ADDED':
      console.log('FAVORITE_ADDED')
      return state
    case 'FAVORITE_ADD_ERROR':
      console.log('FAVORITE_ADD_ERROR')
      return state
    case 'FAVORITE_DELETED':
      console.log('FAVORITE_DELETED')
      return state
    case 'FAVORITE_DELETE_ERROR':
      console.log('FAVORITE_DELETE_ERROR')
      return state
    default:
      return state
  }
}

export default shoppingListReducer