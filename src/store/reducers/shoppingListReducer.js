const initState = {

}

const shoppingListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ITEM_ADDED':
      console.log('ITEM_ADDED')
      return state
    case 'ITEM_ADD_ERROR':
      console.log('ITEM_ADD_ERROR')
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