/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable {
      /**
       * Command Function to Authenticate in Sauce Demo
       * 
       * Visit Sauce Demo and Login to it
       */
      authSauceDemo(): any;
     /**
       * Registration Command with Faker JS
       * 
       * a Command function to fill up registration form using Fake Data
       */
     fillRegistrationForm(): any;
     /**
       * Command Function to Persist Cart in Sauce Demo
       * 
       * Add to cart and Persist the cart items after page reload or logout
       */
      saveCart(): any;
      /**
       * Command Function to Restore Cart Item in Sauce Demo
       * 
       * Restore the cart item
       */
      restoreCart(): any;
      /**
       * Command Function to Add Items to Cart in Sauce Demo
       * 
       * Visit Sauce Demo and Add Items to Cart
       */
      addItemsToCart(): any;
      /**
       * Command Function to Remove Items from Cart in Sauce Demo
       * 
       * Visit Sauce Demo and Remove Items from Cart
       */
      removeItemsFromCart(): any;
    }}
