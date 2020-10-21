
const TestError = require('../models/TestError')
const validator = require('express-validator')


// Add
module.exports.add = [
    
    validator.body('name', 'Please enter Full Name').isLength({ min: 1 }),
    
  
    function(req, res) {
     
      const errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
  
     
      var testError = new TestError({
          name : req.name
      })
  
      
      testError.save(function(err, testError){
          if(err) {
              return res.status(500).json({
                  message: 'Error saving record',
                  error: err
              });
          }
          return res.json({
              message: 'saved',
              _id: user._id
          });
      })
    }
  ]
  
  