const express = require('express')
const app = express()
const port = 8080

// Middlewares
const compression = require('compression')
const logger = require('./middlewares/logger')
const bodyParser = require('body-parser')

app.use(compression())
app.use(logger)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(port, () => console.log(`Server running on localhost:${port}`))

module.exports = app
