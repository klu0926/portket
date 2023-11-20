const randomPublicImage = require('../helper/randomPublicImage')
const path = require('path')
const fs = require('fs')

const resourceController = {
  landing: async (req, res, next) => {
    try {
      const filePath = path.join('public', 'images', 'landing')
      const files = fs.readdirSync(filePath)
      if (!files.length) {
        res.json({
          error: 'Can not find landing images',
        })
        return
      }
      // filter files
      const filterFiles = files.filter((f) => f[0] !== '.')
      const urls = filterFiles.map((f) => `/images/landing/${f}`)

      res.json({
        images: urls,
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = resourceController
