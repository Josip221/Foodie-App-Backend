const express = require('express');
const router = express.Router();

const authJWT = require('../middleware/authJWT');
const roleAuth = require('../middleware/roleAuth');

const {
  registerUser,
  deleteUserById,
  deleteAllUsers,
  checkMe,
  loginUser,
  getAllUsers,
  getUserById,
} = require('../controllers/controllersUser');

router.get('/checkme', authJWT, checkMe);
router.get('/', authJWT, getAllUsers);

router.post('/register', registerUser);
router.post('/login', loginUser);

router.delete('/:id', authJWT, roleAuth('admin'), deleteUserById);
router.delete('/all', authJWT, roleAuth('admin'), deleteAllUsers);

router.get('/:id', authJWT, getUserById);

module.exports = router;
