import axios from 'axios'

const logUserOut = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('userId')
}

const agent = async (method, path, data = {}) => {
  const token = localStorage.getItem('user')
  return await axios ({
    method,
    url: `${process.env.REACT_APP_BACKEND}/${path}`,
    headers: { 'x-access-token': token },
    data
  })
}

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log(error)
  const { response } = error
  if (response.status === 401) {
    logUserOut()
  }
  return Promise.reject(error)
})

const getItems = async () => {
  const userId = localStorage.getItem('userId')
  return await agent('get', `list-items/${userId}`)
}

const getAutoCompleteData = async (query) => {
  return await agent('get', `items/search?query=${query}`)
}

const postItem = async (name) => {
  return await agent('post', 'items', { name })
}

const postListItem = async (itemInfo) => {
  const userId = localStorage.getItem('userId')
  const { name, _id, quantity} = itemInfo
  const data = {
    item: {
      name,
      itemId: _id
    },
    userId,
    quantity
  }
  return await agent('post', 'list-items', data)
}

const deleteListItem = async (itemId) => {
  return await agent('delete', `list-items/${itemId}`)
}

const login = async (credentials) => {
  const response = await agent('post', 'users/login', credentials)
  localStorage.setItem('user', response.data.token)
  localStorage.setItem('userId', response.data.userId)
  return response
}

const register = async (credentials) => {
  return await agent('post', 'users/register', credentials)
}

const getFavorites = async () => {
  const userId = localStorage.getItem('userId')
  return await agent('get', `favorites/${userId}`)
}

const postFavorite = async (itemInfo) => {
  const userId = localStorage.getItem('userId')
  const { name, itemId } = itemInfo.item
  const data = {
    item: {
      name,
      itemId
    },
    userId
  }
  return await agent('post', 'favorites', data)
}

const deleteFavorite = async (itemId) => {
  return await agent('delete', `favorites/${itemId}`)
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