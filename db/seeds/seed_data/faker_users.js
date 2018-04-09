const faker = require('faker');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const password = bcrypt.hashSync('test', 10);

const users = [];

while (users.length<30) {
  const user = {};

  user.first_name = faker.name.firstName();
  user.last_name = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = password;
  user.notifications_on = false;

  users.push(user);
}

fs.writeFile('users.json', JSON.stringify(users));
