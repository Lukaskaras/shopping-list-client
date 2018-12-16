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
    default:
      return state
  }
}

export default shoppingListReducer