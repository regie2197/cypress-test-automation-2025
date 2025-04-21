describe('Pet Store API Tests V2 with cy.request & cy.intercept', () => {
  const pet = {
    id: 12345,
    name: 'Fulgoso',
    status: 'available',
  };

  const updatedPet = {
    id: 12345,
    name: 'Fulgoso Updated',
    status: 'sold',
  };

  const apiKey = Cypress.env('API_KEY') || 'special-key';

  beforeEach(() => {
    console.log('API_BASE_URL:', Cypress.env('API_BASE_URL'));
    console.log('API_KEY:', apiKey);

    cy.intercept('POST', '/pet', (req) => {
      expect(req.headers).to.have.property('api_key', apiKey);
      req.reply({
        statusCode: 200,
        body: { ...pet },
      });
    }).as('createPet');

    cy.intercept('PUT', '/pet', {
      statusCode: 200,
      body: { ...updatedPet },
    }).as('updatePet');

    cy.intercept('GET', `/pet/${pet.id}`, {
      statusCode: 200,
      body: { ...updatedPet },
    }).as('getPet');

    cy.intercept('DELETE', `/pet/${pet.id}`, {
      statusCode: 200,
      body: { message: `${pet.id}` },
    }).as('deletePet');
  });

  it('POST - Create a new pet', () => {
    cy.request({
      method: 'POST',
      url: '/pet',
      headers: {
        'api_key': apiKey,
      },
      body: pet,
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', pet.id);
      expect(response.body).to.have.property('name', pet.name);
      expect(response.body).to.have.property('status', pet.status);
    });
  });

  it('PUT - Update an existing pet', () => {
    cy.request({
      method: 'PUT',
      url: '/pet',
      headers: {
        'api_key': apiKey,
      },
      body: updatedPet,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', updatedPet.id);
      expect(response.body).to.have.property('name', updatedPet.name);
      expect(response.body).to.have.property('status', updatedPet.status);
    });
  });

  it('GET - Find pet by ID', () => {
    cy.request({
      method: 'GET',
      url: `/pet/${pet.id}`,
      headers: {
        'api_key': apiKey,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', pet.id);
      expect(response.body).to.have.property('name', updatedPet.name);
    });
  });

  it('DELETE - Delete the pet', () => {
    cy.request({
      method: 'DELETE',
      url: `/pet/${pet.id}`,
      headers: {
        'api_key': apiKey,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', `${pet.id}`);
    });
  });
});