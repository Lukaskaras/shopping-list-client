export const logUserOut = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('userId')
}