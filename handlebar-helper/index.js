const dayjs = require('dayjs')

module.exports = {
  substring: (text, value) => {
    let end = ''
    if (text && text.length > value) {
      end = '...'
      return text.substring(0, value) + end
    }
  },
  ifOr: (a, b, option) => {
    if (a || b) {
      return option.fn(this)
    } else {
      return option.inverse(this)
    }
  },
  ifAnd: (a, b, option) => {
    if (a && b) {
      return option.fn(this)
    } else {
      return option.inverse(this)
    }
  },
  simpleDate: (date) => {
    if (!date) return
    return dayjs(date).format('YYYY-MM-DD')
  },
}
