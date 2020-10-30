/**
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

    stop() {
        window.removeEventListener('error', this.onError, true);        
    }

    onError(errorEvent) { 
        const errorTimeStamp = new Date();
        this.logError(errorEvent.error, errorTimeStamp);
    }

    logError(error, errorTimeStamp) {
        console.log("Error name: " + error.name + ", Error message: " + error.message
        + ", Error file: " + this.errorFile + ", Error time stamp: " + errorTimeStamp);
    }
};








