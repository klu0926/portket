const fs = require('fs').promises
const path = require('path')
const errorHandler = require('../helper/errorHandler')
const PATH = path.join('temp')

async function cleanTempFolder() {
  try {
    const files = await fs.readdir(PATH)
    if (!files) return
    const deleteFiles = files.map(async (file) => {
      const filePath = PATH + '/' + file
      await fs.unlink(filePath)
      console.log(`File ${file} deleted successfully`)
    })

    await Promise.all(deleteFiles)
    console.log(`All files in ${PATH} deleted successfully, total files: ${files.length}`)
  } catch (err) {
    errorHandler(err, 'clean Temp Folder')
  }
}

module.exports = cleanTempFolder
