const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const testErrors = require('./routes/testErrors');
const ErrorMonitor = require('../static/ErrorMonitor');

app.use(testErrors);
app.use(ErrorMonitor);

module.exports = {
  path: '/server',
  handler: app
}