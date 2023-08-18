module.exports = {
  authenticator: (req, res, next) => {
    // isAuthenticated is a Passport method
    if (req.isAuthenticated()) {
      console.log('authentication success')
      return next()
    }
    console.log('authentication fail')
    res.redirect('/users/login')
  },
}
