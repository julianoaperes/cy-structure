// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ***** ALLOW CYPRESS RUN THE TESTS EVEN WITH ERROR *****
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

//! *|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*

// ***** TEST COUNTER *****

// Initialize a global counter for describe blocks
let globalDescribeCounter = 0;

/**
 * Custom function to create a numbered `describe` block.
 * Automatically enumerates `describe` and nested `it` blocks.
 *
 * @param {string} description - The description for the `describe` block.
 * @param {function} callback - A callback function containing the `it` blocks.
 */
const customDescribeNumbered = (description, callback) => {
  // Increment the global describe counter for each new block
  const currentDescribeCounter = ++globalDescribeCounter;

  // Initialize an it-block counter specific to this describe block
  let localItCounter = 0;

  /**
   * Custom function to create a numbered `it` block within the describe block.
   *
   * @param {string} itDescription - The description for the `it` block.
   * @param {function} itCallback - The callback function for the test.
   */
  const itWithNumbering = (itDescription, itCallback) => {
    // Increment the it-block counter for each new `it`
    localItCounter++;
    const numberedItDescription = `${currentDescribeCounter}.${localItCounter} ${itDescription}`;
    it(numberedItDescription, itCallback);
  };

  // Add numbering to the `describe` block
  const numberedDescription = `${currentDescribeCounter}. ${description}`;

  // Execute the `describe` block with the numbered description
  describe(numberedDescription, () => {
    callback(itWithNumbering);
  });
};

// Export the custom describeNumbering function for use in tests
export { customDescribeNumbered };

// ! ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
