const dayjs = require('dayjs')

module.exports = {
  substring: (text, value) => {
    let end = ''
    if (text && text.length > value) {
      end = '...'
      return text.substring(0, value) + end
    }
  },
  // if return option.fn(this), will cause the inner block can't get data like {{user.city}}
  // use #if with this helper : {{#if (ifOr item1 item2)}} ... {{/if}}
  ifOr: (a, b, option) => {
    if (a || b) {
      return true
    } else {
      return false
    }
  },
  // same as ifOr
  ifAnd: (a, b, option) => {
    if (a && b) {
      return true
    } else {
      return false
    }
  },
  simpleDate: (date) => {
    if (!date) return
    return dayjs(date).format('YYYY-MM-DD')
  },
}
