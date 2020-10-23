const { Router } = require('express')

const router = Router()

console.log('inside router')

const testErrorsController = require('../controllers/testErrorsController')

// Create error index
router.post('/testErrors/register', testErrorsController.register)


module.exports = router