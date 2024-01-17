const path = require('path')
const { glob } = require('glob')

module.exports = {
  mode: 'production',
  entry: glob.sync('./public/javascript/*.js').reduce((entries, entry) => {
    const entryName = path.basename(entry, path.extname(entry))
    entries[entryName] = `./${entry}`
    return entries
  }, {}),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  watch: true,
}
