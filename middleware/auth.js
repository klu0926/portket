module.exports = {
  authenticator: (req, res, next) => {
    // isAuthenticated is a Passport method
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  },
}
