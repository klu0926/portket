const randomPublicImage = require('../../helper/randomPublicImage')
const path = require('path')
const fs = require('fs')
const responseObject = require('../../helper/responseObject')

const resourceController = {
  landing: async (req, res, next) => {
    const ACTION = 'GET landing'
    try {
      const filePath = path.join('public', 'images', 'landing')
      const files = fs.readdirSync(filePath)
      if (!files.length) {
        throw new Error('can not find image files for landing')
      }
      // filter files
      const filterFiles = files.filter((f) => f[0] !== '.')
      const urls = filterFiles.map((f) => `/images/landing/${f}`)

      const data = {
        images: urls,
      }
      const message = 'Successfully get landing images urls'
      res.json(responseObject(true, data, message, ACTION))
    } catch (err) {
      res.json(responseObject(false, null, err.message, ACTION))
    }
  },
}

module.exports = resourceController
