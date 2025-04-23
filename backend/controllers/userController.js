const { hash, compare } = require('bcryptjs');
const {
  getUserByEmail,
  addUser,
  getAllUsers,
  getUserById,
  updateUser: updateUserDb,
  patchUser: patchUserDb,
  deleteUser: deleteUserDb
} = require('../database/userDb');

// Use a static token for testing
const STATIC_TOKEN = 'STATIC_TOKEN_123';

// Register
async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const exists = getUserByEmail(email);
  if (exists) return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await hash(password, 10);
  const user = addUser({ name, email, password: hashedPassword });

  res.status(201).json({ message: 'User registered', user: { id: user.id, name, email } });
}

// Login
async function login(req, res) {
  const { email, password } = req.body;
  const user = getUserByEmail(email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const match = await compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid password' });

  // Use static token for testing
  res.json({ token: STATIC_TOKEN });
}

// Get All Users
function getAll(req, res) {
  const users = getAllUsers().map(({ password, ...u }) => u);
  res.json(users);
}

// Get User by ID
function getById(req, res) {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { password, ...safeUser } = user;
  res.json(safeUser);
}

// Update (PUT)
async function updateUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const hashed = await hash(password, 10);
  const user = updateUserDb(req.params.id, { name, email, password: hashed });

  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ message: 'User updated', user: { id: user.id, name, email } });
}

// Patch (PATCH)
async function patchUser(req, res) {
  const patchData = { ...req.body };
  if (patchData.password) {
    patchData.password = await hash(patchData.password, 10);
  }

  const user = patchUserDb(req.params.id, patchData);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { password, ...safeUser } = user;
  res.json({ message: 'User patched', user: safeUser });
}

// Delete
function deleteUser(req, res) {
  const success = deleteUserDb(req.params.id);
  if (!success) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
}

module.exports = {
  register,
  login,
  getAll,
  getById,
  updateUser,
  patchUser,
  deleteUser
};
