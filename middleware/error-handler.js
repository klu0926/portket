module.exports = {
  errorHandler(error, req, res, next) {
    console.log('-------------------------')
    console.group('Sever Error')
    console.error('Error Message', error.message)
    // Check if the error has a stack trace
    if (error.stack) {
      // Split the stack trace into lines and log the origin (first line)
      const stackLines = error.stack.split('\n')
      console.error('Error originated from:', stackLines[1].trim())
    }
    console.groupEnd()
    console.log('-------------------------')

    // response
    res.status(500).send('Something went wrong!')
  },
}
