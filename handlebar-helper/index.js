const dayjs = require('dayjs')

module.exports = {
  substring: function (text, value) {
    let end = ''
    if (text.length > value) end = '...'
    return text.substring(0, value) + end
  },
  // if (a || b)
  ifOr: function (a, b, option) {
    if (a || b) {
      return option.fn(this)
    } else {
      return option.inverse(this)
    }
  },
  simpleDate: function (date) {
    if (!date) return
    return dayjs(date).format('YYYY-MM-DD')
  },
}
