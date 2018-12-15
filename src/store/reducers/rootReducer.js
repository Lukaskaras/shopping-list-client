import { combineReducers } from 'redux'
import authReducer from './authReducer'
import shoppingListReducer from './shoppingListReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  shoppingList: shoppingListReducer
})

export default rootReducer