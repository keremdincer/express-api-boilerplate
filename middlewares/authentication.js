const { verify } = require('../utilities/token')

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization']
  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }
  if (!verify(token)) {
    return res.status(401).send('Access denied. Invalid token provided.')
  }
  next()
}
