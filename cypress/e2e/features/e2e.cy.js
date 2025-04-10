describe('Authentication & Add to Cart', () => {
     // It will run before each test case (it block)
    /*if matagal mag run ang test
     * 1.possible na slow internet 
       2.mabagal ang test environment
       3. down yung Server (API, DB etc.)*/
    beforeEach(() => {
      cy.auth('standard_user', 'secret_sauce')
      //cy.login(process.env.USERNAME, process.env.PASSWORD)
    });
  
    it('Should successfully login', () => {
      // Verify we're on the inventory page after login
      cy.url().should('include', '/inventory.html')
      cy.get('.inventory_list').should('be.visible')
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
  