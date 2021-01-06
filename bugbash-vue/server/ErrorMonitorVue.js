/**
 * Monitor for errors and add data to database.
 *
 * @module ErrorMonitor
 */
export default class ErrorMonitor {
  constructor(config) {
    super.constructor(...arguments);
    // this.url = "http://localhost:3000/api/server/quotes";
    Object.assign(this, config);
    this.onError = this.onError.bind(this);
    // require('server.js');

    if (this.autoStart) {
      this.start();
    }
  }
  /**
   * Start the window monitor for errors.
   */
  start() {
    console.log("inside start");
    this.startDate = new Date();
    window.addEventListener("error", this.onError, true);
  }

  /**
   * Stop the wondow monitor for errors.
   */
  stop() {
    window.removeEventListener("error", this.onError, true);
  }

  /**
   *
   * @param {ErrorEvent} errorEvent
   */
  onError(errorEvent) {
    console.log("inside onError Vue");
    this.logError(errorEvent.error);
    this.addError(errorEvent.error);
    console.log('navigator: ')
    console.log(window.navigator.language);
    console.log('navigator end');
    this.stop();
  }

  /**
   * Log info about error in the console.
   *
   * @param {error} error
   * @param {Date} errorTimeStamp
   */
  logError(error) {
    console.log(
      "inside logError - Error name: " +
        error.name +
        ", Error message: " +
        error.message
    );
  }

  /**
   * Add error to database.
   *
   * @param {Error} error
   */
  async addError(error) {
    const errorMessage = error.message;
    console.log(
      "inside addError "
    );

    const errorData = {
      message: error.message,
      stack: error.stack,
      timeStamp: Date.now(),
      fileName: error.fileName,
      session: {
        startDate: this.startDate,
        duration: Date.now() - this.startDate,
        url: location.href,
      },
      language: window.navigator.language,
      plugins: window.navigator.plugins,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      mode: "cors",
      body: JSON.stringify(errorData),
    };
    fetch("http://localhost:3000/errorRouter", options).then((response) =>
      response.json()
    );

    const responseText = await response.text();
    const result = await JSON.parse(responseText);

    if (result.success) {
      console.log("Error logged");
    } else {
      console.error("Error logging failed");
    }
  }
}
