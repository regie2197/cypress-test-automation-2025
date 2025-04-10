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

Cypress.Commands.add('auth', (username, password) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
    cy.visit('https://www.saucedemo.com/', {timeout: 240000})
      cy.get('[data-test="username"]').type(username)
      cy.get('[data-test="password"]').type(password)
      cy.get('[data-test="login-button"]').click()
});

// Utility Command for taking full page Screenshot
Cypress.Commands.add('takeSS', (folderPath, fileName) => {
    const screenshotFullPath = `${folderPath}/${fileName}`;
    cy.screenshot(screenshotFullPath, { capture: "fullPage" });
  });
  /**
   * Formats a date into a human-readable format: MM-DD-YYYY_HH-MM-SS
   * @returns {String} - The formatted date string
   */
  const getFormattedDate = () => {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${month}-${day}-${year}_${hours}-${minutes}-${seconds}`;
  };
  
  // Add the custom command to Cypress
  Cypress.Commands.add('getFormattedDate', () => {
    return getFormattedDate();
  });

Cypress.Commands.add('screenshotWithTimestamp', (folderPath, baseFileName) => {
    const timestamp = getFormattedDate();
    const fileName = `${baseFileName}_${timestamp}`;
    cy.takeSS(folderPath, fileName);
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