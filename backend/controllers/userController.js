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
  if (users.length === 0) return res.status(404).json({ message: 'No users found' });
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

async function patchUser(req, res) {
  try {
    const patchData = { ...req.body };
    const updateFields = [];

    // Check which fields are being updated
    if (patchData.name) updateFields.push('name');
    if (patchData.email) updateFields.push('email');
    if (patchData.password) {
      patchData.password = await hash(patchData.password, 10);
      updateFields.push('password');
    }

    // Update the user in the database
    const user = await patchUserDb(req.params.id, patchData);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Log the returned user for debugging
    console.log('Updated User:', user);

    // Construct the response message based on updated fields
    const message =
      updateFields.length > 0
        ? `Successfully updated the ${updateFields.join(', ')}`
        : 'No fields were updated';

    // Exclude the password from the response
    const { password, ...safeUser } = user;

    // Send the response
    res.json({ message, user: safeUser });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete
function deleteUser(req, res) {
try {  
  const success = deleteUserDb(req.params.id);
  if (!success) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
}
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
