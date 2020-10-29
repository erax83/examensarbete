/**
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
        window.addEventListener('error', this.onError, true);        
    }

    stop() {
        window.removeEventListener('error', this.onError, true);        
    }

    onError(errorEvent) { 
        this.logError(errorEvent.error);
    }

    logError(error) {
        console.log(error.name)
    }
};








