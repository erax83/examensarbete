
const TestError = require('../models/TestError')
const validator = require('express-validator')


// Create
module.exports.create = [
    
    validator.body('someError', 'Please enter an error').isLength({ min: 1 }),
    
  
    function(req, res) {
    console.log('inside controller');
      const errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
          //console.log('Error!!!');
        return res.status(422).json({ errors: errors.mapped() });
      }
  
      var testError = new TestError({
          someError : req.body.someError
      });

      console.log(testError._id);
      console.log(req.someError);
  
      testError.save(function(err, testError){
          console.log('inside save');
          
          if(err) {
              console.log('inside save error');
              return res.status(500).json({
                  message: 'Error saving record',
                  error: err
              });
          }
          return res.json({
              message: 'saved',
              _id: testError._id
          });
      })
    }
  ]
  
  