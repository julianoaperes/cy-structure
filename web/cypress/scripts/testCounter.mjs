// Import the `readFileSync` and `writeFileSync` functions from the `fs` module
// These functions allow reading and writing files synchronously
import { readFileSync, writeFileSync } from 'fs';

// Import the `path` module to work with file and directory paths
import path from 'path';

// Import `fileURLToPath` from the `url` module to work with ES module URLs
import { fileURLToPath } from 'url';

// Get the file path of the current script
const __filename = fileURLToPath(import.meta.url); // Converts the `import.meta.url` to a file path

// Get the directory name of the current script
const __dirname = path.dirname(__filename); // Extracts the directory from the file path

// Construct the path to the test file
const testFilePath = path.join(
  __dirname, // Start with the directory of the current script
  '../web/cypress/e2e/ts01-login.cy.js' // Navigate to the relative location of the test file
);

// Read the content of the test file
// `utf8` specifies that the file should be read as a UTF-8 encoded string
let fileContent = readFileSync(testFilePath, 'utf8');

// Initialize a counter for numbering `describe` blocks
let describeCounter = 0;

// Process the file content to add numbering to `describe` and `it` blocks
fileContent = fileContent.replace(
  // Regular expression to match `describe` blocks
  /describe\((['"`])(.+?)\1,\s*\(it\)\s*=>\s*{([\s\S]*?)}\);/g,
  // Callback function to replace matched content
  (match, quote, describeText, itContent) => {
    describeCounter++; // Increment the `describe` block counter
    let itCounter = 0; // Initialize a counter for numbering `it` blocks inside this `describe`

    // Add numbering to each `it` block inside the `describe` block
    const updatedItContent = itContent.replace(/it\((['"`])(.+?)\1/g, () => {
      itCounter++; // Increment the `it` block counter
      // Add numbering to the `it` block description
      return `it(${quote}${describeCounter}.${itCounter} $2${quote}`;
    });

    // Add numbering to the `describe` block and return the updated content
    return `describe(${quote}${describeCounter}. ${describeText}${quote}, (it) => {${updatedItContent}});`;
  }
);

// Write the updated content back to the test file
writeFileSync(testFilePath, fileContent, 'utf8'); // Overwrite the file with the modified content

// Log a success message to the console
console.log('Numbering added to the test file successfully!');
/**
 * Explanation of Key Steps
File Path Resolution:

The code determines the path of the current script and uses it to locate the test file (ts01-login.cy.js).
This ensures the script can be executed from any directory without breaking paths.
File Reading and Writing:

The test file content is read synchronously using readFileSync, allowing direct manipulation of its content in memory.
After processing, the modified content is written back to the file using writeFileSync.
Regular Expression for describe Blocks:

The replace function uses a regular expression to match describe blocks and extract their content.
It captures the quote type, the description, and the content of the describe block for processing.
Numbering:

A global counter (describeCounter) is used to number describe blocks sequentially.
A local counter (itCounter) numbers each it block within a describe block.
Dynamic Updates:

Each describe block and its nested it blocks are dynamically updated with numbering.
The code ensures unique numbering across the file.
Output:

The script logs a success message after modifying the file, confirming the operation's completion.
This code is structured to handle JavaScript test files with describe and it blocks, commonly used in testing frameworks like Mocha or Cypress.
 * 
 */
