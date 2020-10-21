const { Router } = require('express')

const router = Router()

const testErrorsController = require('../controllers/testErrorsController')

// Add error
router.post('/testErrors/add', testErrorsController.add)


module.exports = router