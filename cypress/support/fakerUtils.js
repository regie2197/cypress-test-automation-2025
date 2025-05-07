import { faker } from '@faker-js/faker';

export function generateCustomerData() {

  const randomNumber = faker.string.numeric(2);
  const usernameBase = faker.internet.username();
  const username = `${usernameBase}${randomNumber}`;
  //const username = usernameBase + randomNumber;
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(), // pwedeng custom test data yung phone number
    ssn: faker.string.numeric(9),
    //username: faker.internet.username(),
    username: username,
    password: 'passw0rd',
  };
}

export function generateUserRegistrationData() {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: 'password123',
  };
}