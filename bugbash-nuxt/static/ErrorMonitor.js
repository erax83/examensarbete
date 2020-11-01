/**
 * Monitor for errors and add data to database.
 * 
 * @module ErrorMonitor
 */
export default class ErrorMonitor {
    constructor(config, errorFile) {
        super.constructor(...arguments);
        Object.assign(this, config);
        this.onError = this.onError.bind(this);
        this.errorFile = errorFile;
        if(this.autoStart) {
            this.start();
        }
    }
    /**
     * Start the window monitor for errors.
     */
    start() {
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
     * @param {errorEvent} errorEvent 
     */
    onError(errorEvent) { 
        const errorTimeStamp = new Date();
        this.logError(errorEvent.error, errorTimeStamp);
        this.addError(errorEvent.error);
    }

    /**
     * Log info about error in the console.
     * 
     * @param {error} error 
     * @param {Date} errorTimeStamp 
     */
    logError(error, errorTimeStamp) {
        console.log("Error name: " + error.name + ", Error message: " + error.message
        + ", Error file: " + this.errorFile + ", Error time stamp: " + errorTimeStamp);
    }

    /**
     * Add error to database.
     * 
     * @param {error} error 
     */
    addError(error) {
        console.log('inside addError');
        errorName = error.name;
        this.$axios.post( '/server/monitorRoute', {
            name: errorName
          })
          .then((response) => {
            console.log('inside addError');
            console.log(response);
            if(response.data._id){
              this.$router.push({ name:'monitorRoute', params:{ created:'yes' } })
            }
          })
          .catch( (error) => {
            console.log(error)
            if(error.response.data.errors){
              this.errors = error.response.data.errors
            }
          });
    }
};








