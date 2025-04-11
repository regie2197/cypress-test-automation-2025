/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable {
      /**
       * Command Function to Authenticate in Sauce Demo
       * 
       * Visit Sauce Demo and Login to it
       */
      auth(): any;
     /**
       * Registration Command with Faker JS
       * 
       * a Command function to fill up registration form using Fake Data
       */
     fillRegistrationForm(): any;
    
    }}
