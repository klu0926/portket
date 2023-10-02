const errorHandler = require('../helper/errorHandler')

function addHttpIfNeeded(url) {
  try {
    if (!url) throw new error('no url input')
    url = url.toLowerCase()
    if (!url.startsWith('http://') && !url.startsWith('https//')) {
      return 'http://' + url
    }
    return url
  } catch (err) {
    errorHandler(err, 'add http if needed')
  }
}

module.exports = addHttpIfNeeded
