const initState = {

}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log('loginerror')
      return state
    case 'LOGIN_SUCCESS':
      console.log('loginsuccess')
      return state
    case 'REGISTER_SUCCESS':
      console.log('registersuccess')
      return state
    case 'REGISTER_ERROR':
      console.log('registererror')
      return state
    case 'LOGOUT_SUCCESS':
      console.log('logoutsuccess')
      return state
    default:
      return state
  }
}

export default authReducer