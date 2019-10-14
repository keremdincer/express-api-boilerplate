'use strict'

const { expect } = require('chai')
const { sign, verify } = require('../../utilities/token')

describe('JWT Module', () => {
  describe('"Creation"', () => {
    it('should create a jwt token', () => {
      const token = sign({ username: 'dummy', isAdmin: false })
      expect(token).to.be.a('string')
    })
  })

  describe('"Validation"', () => {
    it('should parse valid jwt token to json object', () => {
      const token = sign({ username: 'dummy', isAdmin: false })
      const parsed = verify(token)
      expect(parsed).to.be.a('object')
    })

    it('should return false for invalid token string', () => {
      const token = 'fakreurbqrlbruelabl'
      const parsed = verify(token)
      expect(parsed).to.be.eq(false)
    })
  })
})
