module.exports = {
  errorHandler(error, req, res, next){
    console.error(error.message)
    res.send('Server error, check terminal message')
  }
}
