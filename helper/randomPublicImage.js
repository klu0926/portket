const path = require('path')
const fs = require('fs')

module.exports = (...dir) => {
  const filePath = path.join('public', ...dir)
  try {
    const files = fs.readdirSync(filePath)
    if (!files.length) {
      console.log(`Can not find files in ${filePath}`)
      return
    }
    const fileName = files[Math.floor(Math.random() * files.length)]
    return '/' + path.join(...dir) + '/' + fileName
  } catch (err) {
    console.log(`Error reading directory ${filePath}`, err)
  }
}
