import axios from 'axios'

const getItems = async () => {
  try {
    const token = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')
    const response =  await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/items/${userId}`,
      headers: { 'x-access-token': token }
    })
    return response.data
  } catch (err) {
    console.log(err)
    if (err.response.status === 401) {
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
    }
  }
}

const postItem = async (itemInfo) => {
  try {
    const token = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')
    const response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/items/`,
      headers: { 'x-access-token': token },
      data: {
        ...itemInfo,
        userId
      }
    })
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
    if (err.response.status === 401) {
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
    }
  }
}

const deleteItem = async (itemId) => {
  try {
    const token = localStorage.getItem('user')
    const response = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_BACKEND}/items/${itemId}`,
      headers: { 'x-access-token': token }
    })
    return response.data
  } catch (err) {
    console.log(err)
    if (err.response.status === 401) {
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
    }
  }
}

const login = async (credentials) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/users/login`,
      data: credentials,
      headers: {'Content-Type': 'application/json'}
    })
    console.log(response)
    localStorage.setItem('user', response.data.token)
    localStorage.setItem('userId', response.data.userId)
  } catch (err) {
    console.log(err)
  }
}

const register = async (credentials) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/users/register`,
      data: credentials,
      headers: {'Content-Type': 'application/json'}
    })
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

export const backendService = {
  getItems,
  postItem,
  deleteItem,
  login,
  register
}