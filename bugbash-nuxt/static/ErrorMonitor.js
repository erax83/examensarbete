
/**
 * Monitor for errors and add data to database.
 * 
 * @module ErrorMonitor
 */
export default class ErrorMonitor {
    constructor(config) {
        super.constructor(...arguments);
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
        
        this.logError(errorEvent.error, errorTimeStamp);
        this.addError(errorEvent.error);
        this.stop();
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
     * @param {Error} error 
     */
    addError(error) {
        const errorName = error.name;
        console.log('inside addError, errorName: ' + errorName);
        const errorData = {
            message: error.message,
            stack: error.stack,
            timeStamp: Date.now(),
            fileName: error.fileName,
            session: {
              startDate: this.startDate,
              duration: Date.now() - this.startDate,
              url: location.href
            }
          }

    }
    
};








