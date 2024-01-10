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
  isNotSame: (a, b) => {
    return !module.exports.isSame(a, b)
  },
  add: (target, number) => {
    if (!isFinite(target) && !isFinite(number)) return
    return target + number
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
  paginatorArray: (totalPage, currentPage) => {
    if (!totalPage || !isFinite(totalPage)) return
    const PAGE_RANGE = 5
    let currentPageRange = PAGE_RANGE
    const array = []
    // current Page
    array.push(currentPage)
    // get before
    if (totalPage !== 1) {
      if (currentPage !== 1) {
        let i = 1
        while (currentPage - i > 0 && i <= Math.floor(PAGE_RANGE / 2)) {
          array.unshift(currentPage - i)
          i++
        }
      }
      currentPageRange -= array.length
      // get after
      if (currentPage !== totalPage) {
        let i = 1
        while (currentPage + i <= totalPage && i <= currentPageRange) {
          array.push(currentPage + i)
          i++
        }
      }
    }
    return array
  },
  firstArrayItem: (array) => {
    if (!array && array.length === 0) return
    return array[0]
  },
  lastArrayItem: (array) => {
    if (!array && array.length === 0) return
    return array[array.length - 1]
  },
  replaceWord: (string, targetWord, replaceWord) => {
    const args = [...arguments]
    args.forEach((s) => {
      if (typeof s !== 'string') return
    })
    return string.replace(targetWord, replaceWord)
  },
  createArray: (size) => {
    if (!size && !isFinite(size)) return []
    return Array.from({ length: size }, (value, index) => index)
  },
}
