import RegistrationPage from './pages/registration.page';
import { generateCustomerData } from './fakerUtils';

Cypress.Commands.add('authSauceDemo', () => {
  cy.fixture('credentials').then((credentials) => {
    const credential = credentials[0]
    cy.get('[data-test="username"]').type(credential.username)
    cy.get('[data-test="password"]').type(credential.password)
    cy.get('[data-test="login-button"]').click()
  });
});
// Parabank Fill Registration form command
Cypress.Commands.add('fillRegistrationForm', (customerData = generateCustomerData()) => {
  RegistrationPage.fillSignUpForm(customerData);
  RegistrationPage.submitSignUpForm();
  RegistrationPage.verifySignUpSuccess(customerData.username);
});

Cypress.Commands.add('saveCart', () => {
  cy.window().then((win) => {
    const cart = win.localStorage.getItem('cart-contents') || '[]';
    Cypress.env('savedCart', cart);
  });
});

Cypress.Commands.add('restoreCart', () => {
  const cart = Cypress.env('savedCart') || '[]';
  cy.window().then((win) => {
    win.localStorage.setItem('cart-contents', cart);
  });
});
Cypress.Commands.add('assertNavMenus', () => {
  const expectedNavItems = [
    'Home',
    'Products',
    'Cart',
    'Signup  Login',
    'Test Cases',
    'API Testing',
    'Video Tutorials',
    'Contact us'
  ];

  cy.get('.shop-menu > .nav > li > a').each(($element, index) => {
    // Extract the full text of the <a> tag
    cy.wrap($element)
      .invoke('text')
      .then((text) => {
        const cleanedText = text.replace(/[^\w\s]/g, '').trim();
        expect(cleanedText).to.equal(expectedNavItems[index]);
      });
  });
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
  const month = String(now.getMonth() + 1).padStart(2, '0');
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