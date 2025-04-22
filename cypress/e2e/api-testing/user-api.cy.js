import { faker } from '@faker-js/faker';

describe('User API Tests', { testIsolation: false }, () => {
  
  let userId;
  let createdUserName;
  let createdUserEmail;

  it('Should create a user successfully', () => {
    const newUser = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: 'password123',
    };

    cy.api({
      method: 'POST',
      url: 'http://localhost:3000/api/users/register',
      body: newUser,
    }).should((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('User registered');
      expect(response.body.user).to.have.property('id');
      expect(response.body.user.name).to.eq(newUser.name);
      expect(response.body.user.email).to.eq(newUser.email);

      // Store the user details for later assertions
      userId = response.body.user.id;
      createdUserName = response.body.user.name;
      createdUserEmail = response.body.user.email;
    });
  });

  it('Should get the created user by ID', () => {
    cy.api({
      method: 'GET',
      url: `http://localhost:3000/api/users/${userId}`,
      headers: {
        'Authorization': 'Bearer STATIC_TOKEN_123',
      },
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', userId);
      expect(response.body).to.have.property('name', createdUserName); // Assert the username
      expect(response.body).to.have.property('email', createdUserEmail); // Assert the email
    });
  });

});