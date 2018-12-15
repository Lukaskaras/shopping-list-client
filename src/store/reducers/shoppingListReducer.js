const initState = {

}

const shoppingListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ITEMS_RETRIEVED':
      console.log('ITEMS_RETRIEVED')
      return state
    case 'ITEMS_RETRIEVED_ERROR':
      console.log('ITEMS_ERROR')
      return state
    default:
      return state
  }
}

export default shoppingListReducer