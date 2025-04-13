describe('Automation Exercise - Place Order Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/');
    });
    /*
    before(() => {
        //
    })*/

    it.only('Should successfully place an order - Register while Checkout', () => {
        cy.assertNavMenus()
    });
    it('Should successfully place an order - Register before Checkout', () => {

    });
    it('Should successfully place an order - Login before Checkout', () => {

    });
});