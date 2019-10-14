const logger = require('../utilities/logger')

module.exports = (req, res, next) => {
  logger.info({ client: req.ip, method: req.method, url: req.originalUrl })
  next()
}
