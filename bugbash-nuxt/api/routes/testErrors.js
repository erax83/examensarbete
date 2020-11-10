const { Router } = require('express')

const router = Router()

console.log('inside router')

const testErrorsController = require('../controllers/testErrorsController')

// Create error index
router.post('/testErrors', testErrorsController.create)


module.exports = router