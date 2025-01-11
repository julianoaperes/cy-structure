// Import the required modules
import fs from 'fs'; // Provides filesystem-related functionalities, such as creating, reading, and writing files and directories.
import path from 'path'; // Used to work with and manipulate file and directory paths.
import { fileURLToPath } from 'url'; // Converts `import.meta.url` into a file path. Useful for ES Modules since `__dirname` is not available.

// Resolve the current file's path
const __filename = fileURLToPath(import.meta.url);
// Converts `import.meta.url` (a file URL) into a standard file path string.
// Example: 'file:///path/to/cypress.config.mjs' becomes '/path/to/cypress.config.mjs'.

const __dirname = path.dirname(__filename);
// Extracts the directory part of the file path from `__filename`.
// Example: '/path/to/cypress.config.mjs' becomes '/path/to'.

// Generate a sanitized timestamp for folder names in Brazil time zone
const currentTimestamp = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'America/Sao_Paulo', // Sets the timezone to São Paulo, Brazil.
  year: 'numeric', // Displays the full year (e.g., 2025).
  month: '2-digit', // Displays the month as two digits (e.g., 01 for January).
  day: '2-digit', // Displays the day as two digits (e.g., 11 for the 11th).
  hour: '2-digit', // Displays the hour in two digits (e.g., 12 for noon).
  minute: '2-digit', // Displays the minute in two digits (e.g., 50).
  second: '2-digit', // Displays the second in two digits (e.g., 39).
})
  .format(new Date()) // Formats the current date and time in the specified format.
  .replace(' ', 'T') // Adds 'T' separator between date and time for ISO-like format.
  .replace(/:/g, '-'); // Replaces colons with hyphens for compatibility with Windows file systems.

console.log(`Current timestamp (Brazil Time): ${currentTimestamp}`);
// Logs the generated timestamp for debugging purposes.

// Create a results directory dynamically
const resultsDir = path.resolve(
  __dirname, // Starts from the current directory.
  'cypress', // Adds the 'cypress' subdirectory.
  'cy_reports', // Adds the 'cy_reports' subdirectory.
  currentTimestamp // Adds the timestamp subdirectory.
);
// Combines the above parts into an absolute path.
// Example: '/path/to/cypress/cy_reports/2025-01-11T12-51-39'.

if (!fs.existsSync(resultsDir)) {
  // Checks if the directory exists using `fs.existsSync`.
  fs.mkdirSync(resultsDir, { recursive: true });
  // Creates the directory and any necessary parent directories using `fs.mkdirSync` with the `recursive` option.
}

console.log(`Results directory created: ${resultsDir}`);
// Logs the creation of the results directory for debugging purposes.

export default {
  // Export the Cypress configuration object.
  e2e: {
    // Defines the End-to-End (E2E) testing configuration.
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000/',
    // Sets the base URL for the application under test. Falls back to 'http://localhost:3000/' if `CYPRESS_BASE_URL` is not set.
    viewportWidth: 1920, // Sets the width of the browser viewport to 1920 pixels.
    viewportHeight: 1080, // Sets the height of the browser viewport to 1080 pixels.

    reporter: path.resolve('../node_modules/mocha-junit-reporter'),
    // Specifies the test reporter. Uses the resolved path to the 'mocha-junit-reporter'.

    reporterOptions: {
      mochaFile: `cypress/cy_reports/${currentTimestamp}/cy-report.xml`,
      // Default path for the test report file. Includes the timestamp in the directory path.
      toConsole: false,
      // Disables logging test results to the console.
    },

    setupNodeEvents(on, config) {
      // Sets up Node.js event listeners for Cypress tests. `on` is used to listen to events, and `config` is the current test configuration.
      on('before:spec', (spec) => {
        // Listens for the 'before:spec' event, which is triggered before each spec file runs.
        const dynamicPath = path.resolve(
          resultsDir,
          `${path.basename(spec.fileName, path.extname(spec.fileName))}.xml`
        );
        // Constructs a dynamic path for the test report file:
        // - Extracts the base name of the spec file (e.g., 'ts01Login.cy').
        // - Removes the file extension (e.g., '.js').
        // - Appends '.xml' to the file name.

        console.log(`Dynamic mochaFile path: ${dynamicPath}`);
        // Logs the dynamically constructed path for debugging.

        config.reporterOptions.mochaFile = dynamicPath;
        // Updates the reporter's `mochaFile` option with the dynamic path.
      });
    },
  },
};
/**
 Summary
File System Operations: Creates a results directory with a unique timestamp in the Brazil timezone.
Cypress Configuration: Specifies test environment settings (e.g., viewport size, base URL) and reporter details.
Dynamic Test Reporting: Generates dynamic report file paths based on the test spec file name.
ES Module Syntax: Uses import/export for compatibility with modern JavaScript module standards.
 */
