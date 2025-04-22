
let petId; // Shared variable to store the pet ID
// {'testIsolation': false},

//const apiKey = Cypress.env('API_KEY') || 'special-key';

describe('Pet Store API Tests for PET endpoint', () => {
  const pet = {
    id: 12346,
    name: 'Fulgoso',
    status: 'available',
  };

  const updatedPet = {
    id: 12346,
    name: 'Fulgoso Updated',
    status: 'sold',
  };

  // Create a pet before running the tests
  // Action = Mag Request using cy.api then Assert using .then / method and expect
  before(() => {
    cy.api({
      method: 'POST',
      url: '/pet',
      body: pet,
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', pet.id)
      petId = response.body.id
    });
  });

  // Clean up by deleting the pet after all tests
  after(() => {
    cy.api({
      method: 'DELETE',
      url: `/pet/${petId}`,
    }).should((response) => {
      expect(response.status).to.eq(200)
    });
  });

  it('PUT - Update an existing pet', () => {
    cy.wrap(petId).should('exist'); // Ensure petId exists

    cy.api({
      method: 'PUT',
      url: '/pet',
      body: updatedPet,
    }).should((response) => {
      expect(response.status).to.eq(200) // Validate status code
      expect(response.body).to.have.property('id', petId) // Validate response body
      expect(response.body).to.have.property('name', updatedPet.name);
      expect(response.body).to.have.property('status', updatedPet.status)
    });
  });
 
  it('GET - Find pet by ID', () => {
    cy.wrap(petId).should('exist')
    cy.waitUntil(
      () =>
        cy.api({
            method: 'GET',
            url: `/pet/${petId}`,
          })
          .should((response) => {
            if (response.status === 200 && response.body.name === updatedPet.name) {
              return true;
            }
            return false;
          }),
      {
        timeout: 10000,
        interval: 1000,
      }
    );
    cy.api({
      method: 'GET',
      url: `/pet/${petId}`,
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', petId)
      expect(response.body).to.have.property('name', updatedPet.name)
    });
  });

  it('GET - Ensure no sensitive data is exposed', () => {
    cy.wrap(petId).should('exist')

    cy.api({
      method: 'GET',
      url: `/pet/${petId}`,
    }).should((response) => {
      expect(response.body).to.not.have.property('bearer-token')
      expect(response.body).to.not.have.property('access-token')
      expect(response.body).to.not.have.property('jwt-token')
      expect(response.body).to.not.have.property('password')
      expect(response.body).to.not.have.property('api_key')
    });
  });
});

let userName;

describe('Pet Store API Tests for USERS', () => {
  const user = [{
    id: 12346,
    username: 'user21',
    firstName: 'Reg',
    lastName: 'test',
    email: 'reg@email.com',
    password: 'passw0rd',
    phone: '1234567890',
    userStatus: 1,
  }]
  const updatedUser = {
    firstName: 'Reg',
    lastName: 'test',
    email: 'regie@email.com',
  }
  before(() => {
    cy.api({
      method: 'POST',
      url: '/user/createWithList',
      body: user,
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('username', user[0].username)
      userName = user[0].username
    });
  });
  it('PUT - Update User Profile', () => {
    //cy.wrap(userName).should('exist');
    // Update the user profile
    cy.api({
      method: 'PUT',
      url: '/user/user21',
      body: updatedUser,
    }).should((response) => {
      expect(response.status).to.eq(200);
    });
  });
});