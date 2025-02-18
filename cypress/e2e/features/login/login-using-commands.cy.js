describe('Authentication and Assertion Without cy.session()', () => {

beforeEach(() => {
    cy.login('regietest', 'regietest')
    /*
        cy.visit('https://parabank.parasoft.com/parabank/index.htm')
        cy.get('input[name=username]').type(username)
        cy.get('input[name=password]').type(`${password}{Enter}`)
    */
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