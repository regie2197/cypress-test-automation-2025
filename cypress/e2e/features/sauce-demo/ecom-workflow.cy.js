/// <reference types ="cypress" />

describe('E-Com Test Flow/Workflow', {testIsolation: false}, () => {
   /*
    beforeEach(() => {
      // login to sauce demo
      cy.authSauceDemo()
    });*/
    
    before(() => {
      cy.clearAllLocalStorage();
      cy.visit('https://www.saucedemo.com/')
      // login to sauce demo
      cy.authSauceDemo()
    });
    it('Should successfully login', () => {
      // Verify we're on the inventory page after login
      cy.url().should('include', '/inventory.html')
      cy.get('.inventory_list').should('be.visible')
      cy.screenshot()
    });
  
    it('Should successfully add to cart', () => {
      // Add first product to cart
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .should('be.visible')
      .click()
      // Verify cart badge appears with 1 item
      cy.get('.shopping_cart_badge').should('contain', '1')
      // Optionally, navigate to the cart and verify item is listed
      cy.get('.shopping_cart_link').click()
      cy.url().should('include', '/cart.html')
      cy.get('.cart_item').should('have.length', 1)
      cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')
    });
  });
  