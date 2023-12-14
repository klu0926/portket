const dayjs = require('dayjs')

module.exports = {
  substring: (text, value) => {
    let end = ''
    if (text && text.length > value) {
      end = '...'
      return text.substring(0, value) + end
    }
    return text
  },
  ifOr: (a, b) => {
    if (a || b) {
      return true
    }
    return false
  },
  // same as ifOr
  ifAnd: (a, b) => {
    if (!a || !b) return
    if (a && b) {
      return true
    }
    return false
  },
  isSame: (a, b) => {
    if (!a || !b) return
    if (a.toString() === b.toString()) {
      return true
    }
    return false
  },
  isEmptyString: (a) => {
    if (a === '') return true
    return false
  },
  inArray: (array, item) => {
    if (!array || !item) return
    if (array.includes(item.toString())) return true
    return false
  },
  simpleDate: (date) => {
    if (!date) return
    return dayjs(date).format('YYYY-MM-DD')
  },
  isMoreThanTarget: (number, target) => {
    return number > target
  },
}
