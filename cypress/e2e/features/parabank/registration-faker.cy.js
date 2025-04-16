/// <reference types="cypress" />
describe('Parabank Registration', () => {
    beforeEach(() => {
      cy.clearAllSessionStorage()
      cy.visit('https://parabank.parasoft.com/parabank/register.htm')
    });

    it('Should successfully register a Customer using Faker JS', () => {
        cy.fillRegistrationForm()
        cy.screenshotWithTimestamp('', 'registration_success');
    });

});