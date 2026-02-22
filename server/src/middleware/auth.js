const passport = require('passport')

module.exports = function requireAuth (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      return res.status(403).send({
        error: 'You do not have access to this resource'
      })
    }
    req.user = user
    next()
  })(req, res, next)
}
