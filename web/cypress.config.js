module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "junit",
    reporterOptions: {
      mochaFile: "results/output.xml",
      toConsole: false,
    },
  },
};
