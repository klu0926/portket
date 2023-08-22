module.exports = {
  authenticator: (req, res, next) => {
    // isAuthenticated is a Passport method
    if (req.isAuthenticated()) {
      console.log('authentication success')
      return next()
    }
    console.log('authentication fail')
    req.flash('warning_msg', 'Please login first!')
    res.redirect('/users/login')
  },
}
