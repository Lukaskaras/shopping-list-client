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
    }
}