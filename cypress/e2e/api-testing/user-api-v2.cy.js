import { generateUserRegistrationData } from '../../support/fakerUtils';

describe('User API Tests', { env: { requestMode: true }}, () => {
  
  let userId;
  let createdUserName;
  let createdUserEmail;

  it('Should create a user successfully', () => {
    const newUser = generateUserRegistrationData();
    
    cy.request({
      method: 'POST',
      url: '/api/users/register',
      body: newUser,
    }).should((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('User registered');
      expect(response.body.user).to.have.property('id');
      expect(response.body.user.name).to.eq(newUser.name);
      expect(response.body.user.email).to.eq(newUser.email);

      userId = response.body.user.id;
      createdUserName = response.body.user.name;
      createdUserEmail = response.body.user.email;
    });
  });

  it('Should get the created user by ID', () => {
    cy.request({
      method: 'GET',
      url: `/api/users/${userId}`,
      headers: {
        'Authorization': Cypress.env('authToken')
      },
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', userId);
      expect(response.body).to.have.property('name', createdUserName);
      expect(response.body).to.have.property('email', createdUserEmail);
    });
  });
});