// 监测 token 是否过期
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  const authorization = req.headers['authorization']

  if (authorization) {
    const token = authorization.split(' ')[1]
    const decoded = jwt.decode(token, 'secret')

    if (token && decoded.exp <= new Date() / 1000) {
      return res.json({
        code: 401,
        message: 'Token expired, please Login again'
      })
    } else {
      return next()
    }
  } else {
    return res.json({
      code: 401,
      message: 'Token is NULL'
    })
  }
}
