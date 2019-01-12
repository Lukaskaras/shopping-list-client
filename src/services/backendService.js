import axios from 'axios'

const logUserOut = () => {
  localStorage.removeListItem('user')
  localStorage.removeListItem('userId')
}

const getItems = async () => {
  try {
    const token = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')
    const response =  await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/list-items/${userId}`,
      headers: { 'x-access-token': token }
    })
    return response.data
  } catch (err) {
    if (err.response.status === 401) {
      logUserOut()
    }
  }
}

const getAutoCompleteData = async (query) => {
  try {
    const token = localStorage.getItem('user')
    const response = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/items/search?query=${query}`,
      headers: { 'x-access-token': token }
    })
    return response.data
  } catch (err) {
    if (err.response.status === 401) {
      logUserOut()
    }
  }
}

const postItem = async (name) => {
  try {
    const token = localStorage.getItem('user')
    const response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/items`,
      headers: { 'x-access-token': token },
      data: { name }
    })
    return response.data
  } catch (err) {
    if (err.response.status === 401) {
      logUserOut()
    }
  }
}

const postListItem = async (itemInfo) => {
  try {
    const token = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')
    const { name, _id, quantity } = itemInfo
    const response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/list-items/`,
      headers: { 'x-access-token': token },
      data: {
        item: {
          name,
          itemId: _id
        },
        userId,
        quantity
      }
    })
    return response.data
  } catch (err) {
    if (err.response.status === 401) {
      logUserOut()
    }
  }
}

const deleteListItem = async (itemId) => {
  try {
    const token = localStorage.getItem('user')
    const response = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_BACKEND}/list-items/${itemId}`,
      headers: { 'x-access-token': token }
    })
    return response.data
  } catch (err) {
    if (err.response.status === 401) {
     logUserOut()
    }
  }
}

const login = async (credentials) => {
  const response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/users/login`,
      data: credentials,
      headers: {'Content-Type': 'application/json'}
  })
  localStorage.setItem('user', response.data.token)
  localStorage.setItem('userId', response.data.userId)
  return response
}

const register = async (credentials) => {
  return await axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND}/users/register`,
    data: credentials,
    headers: {'Content-Type': 'application/json'}
  })
}

const getFavorites = async () => {
  try {
    const token = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')
    const response =  await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/favorites/${userId}`,
      headers: { 'x-access-token': token }
    })
    return response.data
  } catch (err) {
    if (err.response.status === 401) {
      logUserOut()
    }
  }
}

const postFavorite = async (itemInfo) => {
  try {
    const token = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')
    const { name, itemId } = itemInfo.item
    const response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/favorites/`,
      headers: { 'x-access-token': token },
      data: {
        item: {
          name,
          itemId
        },
        userId
      }
    })
    return response.data
  } catch (err) {
    if (err.response.status === 401) {
      logUserOut()
    }
  }
}

const deleteFavorite = async (itemId) => {
  try {
    const token = localStorage.getItem('user')
    const response = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_BACKEND}/favorites/${itemId}`,
      headers: { 'x-access-token': token }
    })
    return response.data
  } catch (err) {
    if (err.response.status === 401) {
      logUserOut()
    }
  }
}

export const backendService = {
  getItems,
  postItem,
  postListItem,
  deleteListItem,
  login,
  register,
  getFavorites,
  getAutoCompleteData,
  postFavorite,
  deleteFavorite
}