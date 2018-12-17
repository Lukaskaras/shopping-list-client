import axios from 'axios'
import { backendService } from '../../services/backendService'

export const register = (credentials) => {
  return async (dispatch) => {
    try {
      await backendService.register(credentials)
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
      await backendService.login(credentials)
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
    localStorage.removeItem('userId')
    dispatch({ type: 'LOGOUT_SUCCESS'})
  }
}