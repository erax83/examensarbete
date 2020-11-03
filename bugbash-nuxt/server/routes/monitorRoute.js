// const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const monitorController = require('../controllers/monitorController')

// Add new error
router.post('/monitorRoute', monitorController.add)

module.exports = router