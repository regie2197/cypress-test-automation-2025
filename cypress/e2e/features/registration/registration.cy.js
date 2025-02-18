describe('Registration', () => {
     it('Should be able to click add to cart', () => {
      //Cypress.config('chromeWebSecurity',false);
      cy.intercept('POST', 'https://api.hcaptcha.com/checksiteconfig', {
          statusCode: 200,
          body: { success: true },
        }).as('hcaptchaRequest');
      cy.visit('https://www.harveynorman.com.au/google-nest-cam-outdoor-indoor-battery-1-pack.html')
      //cy.contains('Add to cart').click();
     });
});