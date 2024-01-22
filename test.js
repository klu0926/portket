const dayjs = require('dayjs')
const startAndEndDate = require('./helper/startAndEndDate')


const set = startAndEndDate(1, 60, 60, false)

console.log(set)