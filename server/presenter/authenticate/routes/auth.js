const jwt = require('jsonwebtoken')

function authenticateUser (req, res, next) {
  const KEY = '81ed561fba4c2693700fe9b445050fb19cf80375bd42e7e86dff26d7424f7f889ee3a7c126018814394dfa7e26be36416af1894146ab966c177c74163dfe2522'
  const token = req.headers.authorization

  if (!token) { return res.sendStatus(401) }

  const accessToken = token.split(' ')[1]

  jwt.verify(accessToken, KEY, (err, user) => {
    if (err) { return res.sendStatus(403) }
    req.UserID = user.UserID
    next()
  })
}

module.exports = authenticateUser
