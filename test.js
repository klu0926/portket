const startAndEnd = require('./helper/startAndEndDate')

const dates = startAndEnd(2)

console.log(dates)
console.log(typeof dates[0][0].getFullYear())
