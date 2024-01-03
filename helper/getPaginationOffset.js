/**
 *
 * @param {integer} page which page do you want
 * @param {integer} pageLimit limit the record per page
 * @return {integer} offset of the records
 *
 * @example
 * page=2, size=10 will return offset of 10, and database will return record 11 - 20
 */
function getPaginationOffset(page = 1, limit = 12) {
  return (page - 1) * limit
}

module.exports = getPaginationOffset
