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
      if (response.status === 401) {
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
      }
      return response.data
    } catch (err) {
      console.log('bliblablu')
      console.log(err.response.status)
      if (err.response.status === 401) {
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
      }
    }
}