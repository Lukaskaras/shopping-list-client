import axios from 'axios'

export const register = (credentials) => {
  return async (dispatch) => {
    try {
      console.log(credentials)
      await axios({
        method: 'post',
        url: `http://localhost:3500/users/register`,
        data: credentials,
        headers: {'Content-Type': 'application/json'}
      })
      dispatch({ type: 'REGISTER_SUCCESS'})
    } catch (err) {
      console.log(err)
      dispatch({ type: 'REGISTER_ERROR'})
    }
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:3500/users/login`,
        data: credentials
      })
      console.log(response)
      localStorage.setItem('user', response.data.token)
      localStorage.setItem('userId', response.data.userId)
      dispatch({ type: 'LOGIN_SUCCESS'})
    } catch (err) {
      console.log(err)
      dispatch({ type: 'LOGIN_ERROR'})
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT_SUCCESS'})
  }
}