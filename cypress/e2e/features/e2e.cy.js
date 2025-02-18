describe('Authentication and Assertion Without cy.session()', () => {

  before(() => {
    cy.loginAndSaveCookies('validUser'); // Log in once and save cookies
    //cy.login()
  });

  beforeEach(() => {
    cy.restoreCookies();
    cy.visit('https://parabank.parasoft.com/parabank/overview.htm'); // Navigate directly
  });

  it('Should assert Overview URL after login', () => {
      cy.url().should('include', '/overview.htm');
  });

  const ACCOUNT_TYPE = {
    SAVINGS: '1',
    CHECKING: '0'
};
  it('Open New Account Menu is Visible and User is able to Open New Account', () => {
    cy.contains('Open New Account').should('be.visible').click();
    
    cy.get('#type').select('SAVINGS');
    cy.get('#type').should('have.value', ACCOUNT_TYPE.SAVINGS);
  });

});
