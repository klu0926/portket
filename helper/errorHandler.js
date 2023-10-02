/**
 * Handle error and can provide a title, this also show the origin of the error
 * @param {error} error
 * @param {string} title - The title for the error message
 */
function errorHandler(error, title) {
  console.log('-------------------------')
  console.group('Sever Error')
  console.error('Error Message', title, error.message)
  // Check if the error has a stack trace
  if (error.stack) {
    // Split the stack trace into lines and log the origin (first line)
    const stackLines = error.stack.split('\n')
    console.error('Error originated from:', stackLines[1].trim())
  }
  console.groupEnd()
  console.log('-------------------------')
}

module.exports = errorHandler
