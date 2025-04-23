const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getAll,
  getById,
  updateUser,
  patchUser,
  deleteUser
} = require('../controllers/userController');

const authenticateToken = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/', authenticateToken, getAll);
router.get('/:id', authenticateToken, getById);
router.put('/:id', authenticateToken, updateUser);
router.patch('/:id', authenticateToken, patchUser);
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;
