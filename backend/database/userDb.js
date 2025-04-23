// This is your in-memory "database"
let users = [];

const getAllUsers = () => users;

const getUserById = (id) => users.find(user => user.id === parseInt(id));

const getUserByEmail = (email) => users.find(user => user.email === email);

const addUser = (user) => {
  user.id = users.length + 1;
  users.push(user);
  return user;
};

const updateUser = (id, newUserData) => {
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index !== -1) {
    users[index] = { id: parseInt(id), ...newUserData };
    return users[index];
  }
  return null;
};

const patchUser = async (id, updateFields) => {
  const user = users.find(user => user.id === parseInt(id));
  if (!user) return null;

  Object.assign(user, updateFields);
  return user;
};

const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  patchUser,
  deleteUser
};
