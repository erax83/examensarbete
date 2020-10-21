const express = require('express')
const db = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const errors = require('./routes/errors')

app.use(errors)

module.exports = {
  path: '/server',
  handler: app
}