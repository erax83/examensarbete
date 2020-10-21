const express = require('express')
const db = require('./db')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = {
  path: '/server',
  handler: app
}