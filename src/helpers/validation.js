export const emailIsValid = (email) => {
  return /\S+@\S+\.\S+/.test(email)
}
