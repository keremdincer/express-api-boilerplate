'use strict'

const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const { tokenOptions } = require('../config.json')

const privateKey = fs.readFileSync(
  path.join(__dirname, '..', 'private.key'),
  'utf8'
)
const publicKey = fs.readFileSync(
  path.join(__dirname, '..', 'public.key'),
  'utf8'
)

module.exports = {
  sign: (payload, $options) => {
    const signOptions = {
      ...tokenOptions,
      ...$options,
      algorithm: 'RS256'
    }

    return jwt.sign(payload, privateKey, signOptions)
  },
  verify: (token, $options) => {
    const verifyOptions = {
      ...tokenOptions,
      ...$options,
      algorithm: ['RS256']
    }

    try {
      return jwt.verify(token, publicKey, verifyOptions)
    } catch (err) {
      return false
    }
  },
  decode: (token) => {
    return jwt.decode(token, { complete: true })
  }
}
