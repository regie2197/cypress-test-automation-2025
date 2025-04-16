/// <reference types="cypress" />
// This Spec File will not work due to Cypress Limitation
describe('New Window Modal Tests', () => {
    beforeEach(() => {
      // Visit the modal page before each test
      cy.visit('http://127.0.0.1:5500/modal.html');
    });
  
    it('Should open a new window when the button is clicked', () => {
      // Stub the window.open method to intercept the new window
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });
  
      // Click the "Open New Window Modal" button
      cy.get('.open-new-window-btn').click();
  
      // Verify that window.open was called
      cy.get('@windowOpen').should('be.calledWith', '', '_blank', 'width=400,height=300');
    });
  });