const imgur = require('imgur')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
imgur.setClientId(IMGUR_CLIENT_ID)
const cleanTempFolder = require('../helper/cleanTempFolder')

const imgurFileHandler = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!file) return resolve(null)
      const img = await imgur.uploadFile(file.path)

      // clean temp folder
      await cleanTempFolder()
      resolve(img?.link || null)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = imgurFileHandler
