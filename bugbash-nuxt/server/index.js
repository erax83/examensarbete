const express = require('express')
const db = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const testErrors = require('./routes/testErrors')

app.use(testErrors)

module.exports = {
  path: '/server',
  handler: app
}