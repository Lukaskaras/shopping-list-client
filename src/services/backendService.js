import axios from 'axios'

export const getItems = async () => {
  try {
    const token = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')
    const response =  await axios({
      method: 'get',
      url: `http://localhost:3500/items/${userId}`,
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

export const postItem = async (itemInfo) => {
  try {
    const token = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3500/items/',
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