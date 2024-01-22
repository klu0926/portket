const randomArrayIndex = require('./randomArrayIndex')

module.exports = (array) => {
  if (!array || array.length === 0) return 0
  return array[randomArrayIndex(array)]
}
