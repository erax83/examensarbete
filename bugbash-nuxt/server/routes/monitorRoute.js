// const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const monitorController = require('../controllers/monitorController')

// Add new error
router.post('/add', monitorController.add)

module.exports = router