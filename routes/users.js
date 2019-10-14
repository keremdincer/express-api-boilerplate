const express = require('express')
const router = express.Router()

const uuid = require('uuid/v4')
const db = require('../databases/config')
const { applySalt, compare } = require('../utilities/database')
const { sign } = require('../utilities/token')
const authentication = require('../middlewares/authentication')

router.get('/', authentication, async (req, res) => {
  const users = await db('users').select(['id', 'email', 'name', 'surname'])
  return res.json(users)
})

router.get('/:id', authentication, async (req, res) => {
  const { id } = req.params
  const user = await db('users')
    .where({ id })
    .first(['id', 'email', 'name', 'surname'])

  if (user) {
    return res.json(user)
  } else {
    return res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  const { name, surname, email, password } = req.body
  if (!email || !password) {
    return res.status(400).send('Required fields are not provided.')
  }

  try {
    await db('users')
      .insert({
        id: uuid(),
        name,
        surname,
        email,
        ...applySalt(password)
      })

    const user = await db('users')
      .where({ email })
      .first(['id', 'name', 'surname'])

    const payload = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email
    }

    return res.status(201).json({ token: sign(payload, {}) })
  } catch (err) {
    console.log(err)
    return res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await db('users')
    .where({ email })
    .first(['id', 'name', 'surname', 'hash', 'salt'])

  if (user && compare(user.hash, user.salt, password)) {
    const payload = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email
    }
    return res.status(200).json({ token: sign(payload, {}) })
  } else {
    return res.status(400).end()
  }
})

module.exports = router
