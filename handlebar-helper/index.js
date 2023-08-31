module.exports = {
  substring: function (text, value) {
    let end = ''
    if (text.length > value) end = '...'
    return text.substring(0, value) + end
  },
}
