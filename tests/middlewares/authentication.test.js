const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../server')

// chai configuration
chai.use(chaiHttp)
chai.should()

describe('Authentication/Authorization Middleware', () => {
  describe('Authentication', () => {
    it('should block accessing protected data without token', done => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })

    it('should block accessing protected data with invalid token', done => {
      chai.request(app)
        .get('/users')
        .set('Authorization', 'invalid-jwt-token')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })

    // fetch token
    let token = null
    before(done => {
      const credentials = { email: 'john.doe@joker.com', password: 'john_pass' }
      chai
        .request(app)
        .post('/users/login')
        .type('form')
        .send(credentials)
        .end((err, res) => {
          token = res.body.token
          done()
        })
    })

    it('should let user access protected data with valid token', done => {
      chai.request(app)
        .get('/users')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})
