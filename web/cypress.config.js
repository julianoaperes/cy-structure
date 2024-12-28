module.exports = {
  // The main configuration object for Cypress
  e2e: {
    // Base URL for the application under test
    baseUrl: "http://localhost:3000/", // Specifies the base URL where the app is running locally (e.g., a React app on port 3000)

    // Screen dimensions for the browser viewport
    viewportWidth: 1920, // Sets the width of the browser viewport (useful for ensuring tests run consistently in a specific screen size)
    viewportHeight: 1080, // Sets the height of the browser viewport

    // A function to set up Node event listeners during test runs
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // This function allows you to hook into Cypress events, such as test failures or logging, to extend functionality
    },

    // Configures the test reporter to use for test results
    reporter: "junit", // Specifies the reporter type; "junit" outputs results in a format suitable for CI/CD systems

    // Additional options for the reporter
    reporterOptions: {
      mochaFile: "results/output.xml", // Specifies the file path where test results will be saved in JUnit XML format
      toConsole: false, // Indicates whether to log the reporter's output to the console (false means it won't log in the console)
    },
  },
};
