import { customDescribeNumbered } from '../support/commands.mjs';
customDescribeNumbered('Login', (it) => {
  beforeEach(() => {
    cy.visit('/'); // Given the user accesses this link
    // The it should open the page to login
  }),
  it("Should login successfully when the user fills out the form with valid credentials by clicking on the 'Entrar' button", () => {
    cy.get('a[href = "pre-cadastro"]').click(); // When the user clicks on the "Entrar" button
    cy.get('h2').should('have.text', 'Seus dados'); // Then the user should see the "Seus dados" title
    cy.get('#nome').type('Teste Qa'); // And fill out the "name" field with "Teste Qa"
    cy.get('#email').type('qateste@teste.com'); // And fill out the "email" field
    cy.get('button[type="submit"]').should('have.text', 'Continuar').click(); // And click on the "Continuar" button
    cy.get('h1').should('have.text', 'O LendárioBarbershop'); // Then the user should see the "O LendárioBarbershop" title
  });
});  
