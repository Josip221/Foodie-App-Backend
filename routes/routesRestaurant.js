const express = require('express');
const router = express.Router();
const authJWT = require('../middleware/authJWT');
const roleAuth = require('../middleware/roleAuth');

const {
  createRestaurant,
  getRestaurantById,
  getAllRestaraunts,
} = require('../controllers/controllersRestaurant');

const {
  createItem,
  getItemById,
  getAllItems,
} = require('../controllers/controllersItem');

const {
  createMenu,
  addItemToMenu,
  getAllMenus,
  getMenuById,
} = require('../controllers/controllersMenu');

router.post('/item', authJWT, roleAuth('admin', 'owner'), createItem);
router.get('/item/:id', authJWT, getItemById);
router.get('/item', authJWT, getAllItems);
router.patch('/menu/:id', authJWT, roleAuth('admin', 'owner'), addItemToMenu);

router.post('/menu', authJWT, roleAuth('admin', 'owner'), createMenu);
router.get('/menu', authJWT, getAllMenus);
router.get('/menu/:id', authJWT, getMenuById);

router.post('/', authJWT, roleAuth('admin', 'owner'), createRestaurant);
router.get('/', authJWT, getAllRestaraunts);
router.get('/:id', authJWT, getRestaurantById);

module.exports = router;
