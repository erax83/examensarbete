// const config = require('../config')
const express = require('express')

const router = express.Router()

// Initialize Controller
const monitorController = require('../controllers/monitorController')

// Add new error
router.post('/monitorRoute', monitorController.add)

module.exports = router

