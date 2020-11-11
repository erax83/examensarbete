const mongoose = require('mongoose');
const MonitorModel = require('/models/MonitorModel');


// create new cause
export function add(req, res) {
    const dbPost = new MonitorModelSchema({
      message: req.body.message
    });  
    return dbPost
      .save()
      .then((newCause) => {
        return res.status(201).json({
          success: true,
          message: 'New post created successfully',
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          error: error.message,
        });
      });
  }  