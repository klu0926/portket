module.exports = {
  errorHandler(error, req, res, next){
    console.log(error.message)
  }
}
