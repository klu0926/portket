const errorHandler = require('../helper/errorHandler')
const fs = require('fs')
const sharp = require('sharp')
const imgur = require('imgur')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
imgur.setClientId(IMGUR_CLIENT_ID)

const imgurFileHandler = async (file) => {
  try {
    if (!file) return null

    // Define the destination path for the compressed file
    const compressedFilePath = `${file.path}.compressed${file.extension}`

    // Use sharp to resize and optimize the image
    await sharp(file.path)
      .resize({ width: 2048 })
      .webp({ quality: 50 }) // Adjust quality as needed
      .toFile(compressedFilePath)

    // Upload the compressed file to Imgur
    const img = await imgur.uploadFile(compressedFilePath)

    // Cleanup: delete the temporary compressed file
    fs.unlinkSync(compressedFilePath)

    return img?.link || null
  } catch (err) {
    errorHandler('imgur', err)
  }
}

module.exports = imgurFileHandler
