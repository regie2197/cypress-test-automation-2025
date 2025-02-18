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

Cypress.Commands.add('login', (username, password) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
    cy.visit('https://parabank.parasoft.com/parabank/index.htm')
    cy.get('input[name=username]').type(username)
    cy.get('input[name=password]').type(`${password}{Enter}`) 
});




Cypress.Commands.add('loginAndSaveCookies', (userType) => {
    cy.fixture('users').then((users) => {
        const user = users[userType]; // Get user credentials

        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
        cy.get('input[name=username]').type(user.username);
        cy.get('input[name=password]').type(`${user.password}{enter}`);

        // Ensure login is successful by checking the URL
        cy.url().should('include', '/overview.htm');

        // Save cookies after login
        cy.getCookies().then((cookies) => {
            Cypress.env('savedCookies', cookies);
            console.log(cookies);
        });
    });
});

Cypress.Commands.add('restoreCookies', () => {
    const savedCookies = Cypress.env('savedCookies');
    if (savedCookies) {
        savedCookies.forEach((cookie) => {
            cy.setCookie(cookie.name, cookie.value);
            console.log(savedCookies);
        });
    }
});