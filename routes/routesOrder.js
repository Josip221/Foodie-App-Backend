const express = require('express');
const router = express.Router();
const authJWT = require('../middleware/authJWT');
const roleAuth = require('../middleware/roleAuth');

const { createOrder } = require('../controllers/controllersOrder');
router.post('/:id', authJWT, roleAuth('admin', 'user'), createOrder);

module.exports = router;
