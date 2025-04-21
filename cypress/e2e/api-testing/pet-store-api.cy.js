
let petId; // Shared variable to store the pet ID

describe('Pet Store API Tests', {'testIsolation': false}, () => {
  const pet = {
    id: 12345,
    name: 'Fulgoso',
    status: 'available',
    tags: ['cute', 'friendly', 'playful']
  };

  const updatedPet = {
    id: 12345,
    name: 'Fulgoso Updated',
    status: 'sold',
  };

  // Create a pet before running the tests
  before(() => {
    cy.api({
      method: 'POST',
      url: '/pet',
      body: pet,
    }).then((response) => {
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
    }).then((response) => {
      expect(response.status).to.eq(200)
    });
  });

  it('PUT - Update an existing pet', () => {
    cy.wrap(petId).should('exist'); // Ensure petId exists

    cy.api({
      method: 'PUT',
      url: '/pet',
      body: updatedPet,
    }).then((response) => {
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
        cy
          .api({
            method: 'GET',
            url: `/pet/${petId}`,
          })
          .should((response) => {
            expect(response.status).to.eq(200);
            return response.body.name === updatedPet.name;
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