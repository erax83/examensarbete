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
    const script = document.createElement("script");
    script.src = "../node_modules/html2canvas/dist/html2canvas.js";
    document.head.appendChild(script);
    if (this.autoStart) {
      this.start();
    }
  }
  /**
   * Start the window monitor for errors.
   */
  start() {
    this.startDate = new Date();
    window.addEventListener("error", this.onError, true);
  }

  /**
   * Stop the wondow monitor for errors.
   */
  stop() {
    window.removeEventListener("error", this.onError, true);
  }

  async loadHtml2Canvas() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "../node_modules/html2canvas/dist/html2canvas.js";
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  /**
   *
   * @param {ErrorEvent} errorEvent
   */
  async onError(errorEvent) {
    await this.loadHtml2Canvas();
    const options = {
      type: "dataURL",
    };
    const canvas = await html2canvas(document.body, options);
    const canvasUrl = canvas.toDataURL();
    this.logError(errorEvent.error);
    this.addError(errorEvent.error, canvasUrl);
    this.addErrorHash(errorEvent.error);
    console.log(window.navigator.language);
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
      "Logging error - Error name: " +
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
  async addError(error, canvas) {
    const errorMessage = error.message;

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
      browserWindowWidth: document.documentElement.offsetWidth,
      browserWindowHeight: document.documentElement.offsetHeight,
      canvas: canvas,
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

  /**
   * Add error to database.
   *
   * @param {Error} error
   */
  async addErrorHash(error) {
    const errorMessage = await error.message;
    console.log("inside addErrorHash ");

    const errorData = {
      message: error.message,
      hashNumber: null,
      occurrencesCount: null,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      mode: "cors",
      body: JSON.stringify(errorData),
    };
    fetch("http://localhost:3000/errorRouter/hash", options).then((response) =>
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
