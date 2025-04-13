/// <reference types="cypress" />

describe('Parabank Registration', () => {
    beforeEach(() => {
      cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    });
  
    it('Should successfully register a Customer', () => {
      cy.fixture('customers').then((customers) => {
        const customer = customers[0]
        cy.get('input[id="customer.firstName"]').type(customer.firstName);
        cy.get('input[id="customer.lastName"]').type(customer.lastName);
        cy.get('input[id="customer.address.street"]').type(customer.address);
        cy.get('input[id="customer.address.city"]').type(customer.city);
        cy.get('input[id="customer.address.state"]').type(customer.state);
        cy.get('input[id="customer.address.zipCode"]').type(customer.zipCode);
        cy.get('input[id="customer.phoneNumber"]').type(customer.phoneNumber);
        cy.get('input[id="customer.ssn"]').type(customer.ssn);
        cy.get('input[id="customer.username"]').type(customer.username);
        cy.get('input[id="customer.password"]').type(customer.password);
        cy.get('input[id="repeatedPassword"]').type(customer.password);
  
        cy.get('input[value="Register"]').click();
  
        cy.get('h1.title').should('contain.text', 'Welcome'  + ' ' + customer.username);
        cy.contains('Log Out').should('be.visible').click();
      });
    });
  });
  