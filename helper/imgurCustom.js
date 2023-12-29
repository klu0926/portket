const errorHandler = require('../helper/errorHandler')
const fs = require('fs')
const sharp = require('sharp')
const imgur = require('imgur')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
imgur.setClientId(IMGUR_CLIENT_ID)

/**
 *
 * @param {file} file
 * @param {Integer} bigWidth default to 2028
 * @param {Integer} smallWidth default to 600
 * @returns {array} return array of 2 imgur urls[], array[0]=big, array[1]=small
 */
const imgurFileHandler = async (file, bigWidth = 2028, smallWidth = 200) => {
  try {
    if (!file) return null

    // Define the destination path for the compressed file
    const bigFilePath = `${file.path}_big${file.extension}`
    const smallFilePath = `${file.path}_small${file.extension}`

    // Use sharp to resize and optimize the image
    await sharp(file.path)
      .resize({ width: parseInt(bigWidth) })
      .toFile(bigFilePath)
    await sharp(file.path)
      .resize({ width: parseInt(smallWidth) })
      .toFile(smallFilePath)

    // Upload the compressed file to Imgur
    const big = await imgur.uploadFile(bigFilePath)
    const small = await imgur.uploadFile(smallFilePath)

    // Cleanup: delete the temporary compressed file
    await fs.promises.unlink(bigFilePath)
    await fs.promises.unlink(smallFilePath)

    const urls = []
    urls[0] = big?.link || null
    urls[1] = small?.link || null
    return urls
  } catch (err) {
    errorHandler('imgur', err)
  }
}

module.exports = imgurFileHandler
