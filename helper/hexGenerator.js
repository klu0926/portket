function randomNumber(maxNumber) {
  if (!isFinite(maxNumber)) return 0
  return Math.floor(Math.random() * (maxNumber + 1))
}

/**
 * @param  {number} times how long the hex string return, each times = 2 char
 * @return {string} 'ffffff'
 */
function hexGenerator(times = 1) {
  let result = ''

  for (let i = 0; i < times; i++) {
    console.log('run')
    const number = randomNumber(255) // hex color 0 - 255
    let hex = number.toString(16) // hex formate
    if (hex.length !== 2) {
      hex = '0'.concat(hex)
    }
    result = result.concat(hex)
  }
  return result
}

module.exports = hexGenerator
