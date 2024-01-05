const path = require('path')
const fs = require('fs')

/**
 * @param  {string} dir folder directories (many)
 * @return {string} directory of a public image, eg:/image/dir/dir/image.jps
 *
 * Return a directory of public image's path, without '/public/images' in the front
 * @example
 * randomPublicImage('covers')
 * Get files in path: /public/images/covers, Pick a random file and return one file path
 * return '/images/covers/default.jpeg'
 */
function randomPublicImage(...dir) {
  try {
    if (!dir.length) new Error('RandomPublicImage require ...dir inputs!')

    const filePath = path.join('public', 'images', ...dir)
    let files = fs.readdirSync(filePath)
    if (!files.length) {
      console.log(`Can not find files in ${filePath}`)
      return
    }
    // filter out hidden file
    files = files.filter((f) => f[0] !== '.')

    const fileName = files[Math.floor(Math.random() * files.length)]
    return '/images/' + path.join(...dir) + '/' + fileName
  } catch (err) {
    console.error(`RandomPublicImage`, err, err.message)
  }
}
module.exports = randomPublicImage
