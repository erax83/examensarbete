const { Router } = require('express')

const router = Router()

const errorsController = require('../controllers/errorsController')

// Add error
router.post('/users/add', errorsController.add)