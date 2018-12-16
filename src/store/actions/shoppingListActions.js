import axios from 'axios'

export const getItems = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('user')
      const userId = localStorage.getItem('userId')
      await axios({
        method: 'get',
        url: `http://localhost:3500/items/${userId}`
      })
    } catch (err) {
      console.log(err)
    }
  }
}