

// import axios from 'axios';
/**
 * Monitor for errors and add data to database.
 * 
 * @module ErrorMonitor
 */
export default class ErrorMonitor {   
    constructor(config) {
        super.constructor(...arguments);
        this.url = 'http://localhost:3000/routes/monitorRoute';
        Object.assign(this, config);
        this.onError = this.onError.bind(this);

        if(this.autoStart) {
            this.start();
        }
    }
    /**
     * Start the window monitor for errors.
     */
    start() {
        this.startDate = new Date();
        window.addEventListener('error', this.onError, true);        
    }

    /**
     * Stop the wondow monitor for errors.
     */
    stop() {
        window.removeEventListener('error', this.onError, true);        
    }

    /**
     * 
     * @param {ErrorEvent} errorEvent 
     */
    onError(errorEvent) { 
        
        this.logError(errorEvent.error);
        this.addError(errorEvent.error);
        this.stop();
    }

    /**
     * Log info about error in the console.
     * 
     * @param {error} error 
     * @param {Date} errorTimeStamp 
     */
    logError(error) {
        console.log("Error name: " + error.name + ", Error message: " + error.message);
    }

    /**
     * Add error to database.
     * 
     * @param {Error} error 
     */
    addError(error) {

        const errorMessage = error.message;
        console.log('inside addError, errorName: ' + errorMessage);
        
        const errorData = {
            message: error.message,
            // stack: error.stack,
            // timeStamp: Date.now(),
            // fileName: error.fileName,
            // session: {
            //   startDate: this.startDate,
            //   duration: Date.now() - this.startDate,
            //   url: location.href
            // }
          };

          console.log(errorData);
        //   const fetch = require('node-fetch');
        //   const fetch = require('isomorphic-fetch');

          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/JSON'
            },
            credentials: 'include',
            body: JSON.stringify(errorData)
          };
          try {
            
            fetch(this.url, options)
            .then((res) => {
                console.log('inside then');
                console.log(res.json());
                return res.json();
                
            })
            .then((json) => {
                console.log('inside then 2');
                console.log('Success: ' + json);
             })
             ;
            console.log('try success');
          }
          catch(err) {
              console.log('inside catch');
              console.log(err);
          }
          
        //   console.log('after fetch');




        //   axios.post( '/server/monitorRoute', {
        //     message: errorMessage
        //   })
        //   .then((response) => {
        //     console.log(response)
        //     if(response.data._id){
        //       this.$router.push({ name:'articles', params:{ created:'yes' } })
        //     }
        //   })
        //   .catch( (error) => {
        //     console.log(error)
        //     if(error.response.data.errors){
        //       this.errors = error.response.data.errors
        //     }
        //   });

          
        

    }
    
};








