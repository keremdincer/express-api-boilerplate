const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../server')
const db = require('../../databases/config')

// chai configuration
chai.use(chaiHttp)
chai.should()

describe('Users', () => {
  let token = null
  beforeEach(done => {
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

  describe('"GET /"', () => {
    it('should get all users', done => {
      chai.request(app)
        .get('/users')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  describe('"GET /:id"', () => {
    it('should get single user with given id', done => {
      const id = '8d198fcc-eefa-4a40-a471-ee9f9204c284' // John Doe's id
      chai.request(app)
        .get(`/users/${id}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })

    it('should have status 404 if given id is not valid', done => {
      const id = '123' // Invalid id
      chai.request(app)
        .get(`/users/${id}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          done()
        })
    })
  })

  describe('"POST /"', () => {
    it('should return status code 400 if required fields not given', done => {
      chai
        .request(app)
        .post('/users')
        .type('form')
        .send({})
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('should create new user if all required fields are given', done => {
      const data = { email: 'new.user@joker.com', password: 'new_pass' }
      chai
        .request(app)
        .post('/users')
        .type('form')
        .send(data)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('token')
          done()
        })
    })

    // delete new.user after test
    after(done => {
      db('users')
        .where({ email: 'new.user@joker.com' })
        .del()
        .then(() => {
          done()
        })
    })
  })

  describe('"POST /Login"', () => {
    it('should return token if given email and password are valid', done => {
      const credentials = { email: 'john.doe@joker.com', password: 'john_pass' }
      chai
        .request(app)
        .post('/users/login')
        .type('form')
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('token')
          done()
        })
    })

    it('should return status code 400 if given credentials are invalid', done => {
      const credentials = { email: 'john.doe@joker.com', password: 'invalid' }
      chai
        .request(app)
        .post('/users/login')
        .type('form')
        .send(credentials)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
})
