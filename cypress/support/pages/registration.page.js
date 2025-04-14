class RegistrationPage {
    // Define locators
    firstNameInput = 'input[id="customer.firstName"]';
    lastNameInput = 'input[id="customer.lastName"]';
    addressInput = 'input[id="customer.address.street"]';
    cityInput = 'input[id="customer.address.city"]';
    stateInput = 'input[id="customer.address.state"]';
    zipCodeInput = 'input[id="customer.address.zipCode"]';
    phoneNumberInput = 'input[id="customer.phoneNumber"]';
    ssnInput = 'input[id="customer.ssn"]';
    usernameInput = 'input[id="customer.username"]';
    passwordInput = 'input[id="customer.password"]';
    confirmPasswordInput = 'input[id="repeatedPassword"]';
    registerButton = 'input[value="Register"]';
    welcomeMessage = 'h1.title';
  
    // Method to fill the signup form
    fillSignUpForm({
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      ssn,
      username,
      password,
    }) {
      cy.get(this.firstNameInput).type(firstName);
      cy.get(this.lastNameInput).type(lastName);
      cy.get(this.addressInput).type(address);
      cy.get(this.cityInput).type(city);
      cy.get(this.stateInput).type(state);
      cy.get(this.zipCodeInput).type(zipCode);
      cy.get(this.phoneNumberInput).type(phoneNumber);
      cy.get(this.ssnInput).type(ssn);
      cy.get(this.usernameInput).type(username);
      cy.get(this.passwordInput).type(password);
      cy.get(this.confirmPasswordInput).type(password);
    }
  
    // Method to submit the signup form
    submitSignUpForm() {
      cy.get(this.registerButton).click();
    }
  
    // Method to verify successful signup
    verifySignUpSuccess(username) {
      cy.get(this.welcomeMessage).should('contain.text', `Welcome ${username}`);
    }
  }
  
  export default new RegistrationPage();