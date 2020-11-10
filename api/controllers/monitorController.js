const MonitorModel = require('../models/MonitorModel');
const validator = require('express-validator');

// Add
module.exports.add = [
    // validations rules
    validator.body('message').isLength({ min: 1 }),
  
    function(req, res) {
        console.log('inside controller');
      // throw validation errors
      const errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
  
      // initialize record
      var monitorModel = new MonitorModel({
          message : req.body.message
      })
  
      // save record
      monitorModel.save(function(err, monitorModel){
          if(err) {
              return res.status(500).json({
                  message: 'Error saving record',
                  error: err
              });
          }
          return res.json({
              message: 'saved',
              _id: monitorModel._id
          });
      })
    }
  ];