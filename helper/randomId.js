module.exports = (length) => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let uniqueIdentifier = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    uniqueIdentifier += characters.charAt(randomIndex)
  }
  return uniqueIdentifier
}
