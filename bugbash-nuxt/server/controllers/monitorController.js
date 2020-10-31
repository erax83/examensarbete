const MonitorModel = require('../models/MonitorModel');
const validator = require('express-validator');

// Add
module.exports.add = [
    // validations rules
    validator.body('title', 'Please enter Error Name').isLength({ min: 1 }),
  
    function(req, res) {
      // throw validation errors
      const errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
  
      // initialize record
      var monitorModel = new MonitorModel({
          name : req.body.name
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