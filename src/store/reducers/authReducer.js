const initState = {

}

const authReducer = (state = initState, action) => {
  console.log(action)
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log('loginerror')
      return {
        ...state,
        authError: action.err.response.data.message
      }
    case 'LOGIN_SUCCESS':
      console.log('loginsuccess')
      return state
    case 'REGISTER_SUCCESS':
      console.log('registersuccess')
      return {
        ...state,
        registrationError: null
      }
    case 'REGISTER_ERROR':
      console.log('registererror')
      return {
        ...state,
        registrationError: action.err.response.data.message
      }
    case 'LOGOUT_SUCCESS':
      console.log('logoutsuccess')
      return state
    default:
      return state
  }
}

export default authReducer