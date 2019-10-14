'use strict'

const { expect } = require('chai')
const { applySalt, compare } = require('../../utilities/database')

describe('Database Module', () => {
  describe('applySalt', () => {
    it('should return an object', () => {
      expect(applySalt('example_password')).to.be.a('object')
    })
    it('should return an object with salt and hash keys', () => {
      expect(applySalt('example_password')).to.have.keys(['salt', 'hash'])
    })
    it('should return an object having salt with length 32', () => {
      expect(applySalt('example_password').salt).to.have.length(32)
    })
    it('should return an object having hash with length 128', () => {
      expect(applySalt('example_password').hash).to.have.length(128)
    })
  })

  describe('compare', () => {
    it('should return true if given password, salt and hash are valid', () => {
      const { salt, hash } = applySalt('example_password')
      expect(compare(hash, salt, 'example_password')).to.be.true
    })
    it('should return false if given password, salt or hash ar invalid', () => {
      const { salt, hash } = applySalt('example_password')
      expect(compare(hash, salt, 'wrong_password')).to.be.false
    })
  })
})
