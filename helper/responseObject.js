const { Model } = require('sequelize')

/**
 * Creates a standard response object for API responses
 * @param {boolean} ok - status
 * @param {object} data - the data object to send
 * @param {string} message - any text message
 * @param {string} action - REST method + table name

 * @returns {Object} A object containing status, data, message, and method properties.
 * @example
 * // Successful response
 * const successResponse = responseObject(true, { userId: 123, userName: 'John' }, 'User retrieved successfully', 'GET user');
 * @example
 * // Failed response
 * const failureResponse = responseObject(false, {}, 'Failed to retrieve user', 'GET user');
 */
function responseObject(ok, data, message, action) {
  return { ok, data, message, action }
}

module.exports = responseObject
