const initState = {

}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log('LOGIN_ERROR')
      return {
        ...state,
        authError: action.err.response.data.message
      }
    case 'LOGIN_SUCCESS':
      console.log('LOGIN_SUCCESS')
      return state
    case 'REGISTER_SUCCESS':
      console.log('REGISTER_SUCCESS')
      return {
        ...state,
        registrationError: null
      }
    case 'REGISTER_ERROR':
      console.log('REGISTER_ERROR')
      return {
        ...state,
        registrationError: action.err.response.data.message
      }
    case 'LOGOUT_SUCCESS':
      console.log('LOGOUT_SUCCESS')
      return state
    default:
      return state
  }
}

export default authReducer