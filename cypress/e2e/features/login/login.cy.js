describe('Authentication and Assertion', () => {

  beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/index.htm')
    cy.get('input[name=username]').type('john')
    cy.get('input[name=password]').type('demo{enter}') // {enter} causes the form to submit
  });

  afterEach(() => {
    cy.contains('Log Out').click()
  });

  it('Should be able to assert Overview URL', () => {
     cy.url().should('include', '/overview.htm')

  })
  it('Open New Account Menu is Visible', () => {
    cy.contains('Open New Account').should('be.visible')
  })
})
