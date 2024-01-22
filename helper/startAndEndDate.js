const dayjs = require('dayjs')

/**
 * Return an array of Date Set in array
 * result = [ [set 1], [set 2], ... ]
 * newest to oldest, in a set [end, start]
 * end : is end of working period
 * start: is the start of that work
 *
 * @param {number} setAmount The number of sets to generate. Defaults to 1 if not provided.
 * @returns {Array} Array of [date set]
 */
function startAndEndDate(setAmount = 1) {
  const result = []

  function getRandomInt(min, max) {
    // +1 because it was exclusion, now it is inclusive to our max
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function createStartAndEndDate(dayjsNow) {
    const MIN_MONTH = 1
    const MAX_MONTH = 48 // 4 years
    const now = dayjsNow
    const end = now.subtract(MIN_MONTH, 'month')
    const start = end.subtract(getRandomInt(MIN_MONTH, MAX_MONTH), 'month')
    return [end, start] // return dayjs object array
  }

  let now = dayjs()
  for (let i = 0; i < setAmount; i++) {
    const set = createStartAndEndDate(now)
    now = set[1] /// new end is the start of last job
    const dates = set.map((s) => s.toDate())
    result.push(dates)
  }
  // change the last set's end day to be '9999-12-31' which is 'present'
  // use this to set user is still working there
  const present = dayjs('9999-12-31')
  result[0][0] = present.toDate()
  return result
}

module.exports = startAndEndDate
