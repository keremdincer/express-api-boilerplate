const crypto = require('crypto')

module.exports = {
  applySalt (password) {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
      .pbkdf2Sync(password, salt, 100, 64, 'sha512')
      .toString('hex')

    return { salt, hash }
  },
  compare (hash, salt, password) {
    const hashed_password = crypto
      .pbkdf2Sync(password, salt, 100, 64, 'sha512')
      .toString('hex')

    return hashed_password === hash
  }
}
