/// <reference types="cypress" />
describe('Cart Persistence Test', () => {
    it('adds item to cart and saves cart contents', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.authSauceDemo();

        // Add item to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Save current cart state
        cy.saveCart();

        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
    });

    describe('Verify cart item persists after restoring cart and login', () => {
        beforeEach(() => {
            cy.visit('https://www.saucedemo.com/');

            // Restore cart contents before auth
            cy.restoreCart();

            cy.authSauceDemo();
        });
        it('should show the item in the cart after login', () => {
            cy.get('.shopping_cart_badge').should('contain', '1');
        });
    });
});
