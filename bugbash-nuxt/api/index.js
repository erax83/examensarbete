const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const testErrors = require('./routes/testErrors');
const monitorRoute = require('./routes/monitorRoute');

// app.use(testErrors);
app.use(monitorRoute);

module.exports = {
  path: '/api',
  handler: app
}