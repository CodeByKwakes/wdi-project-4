var express = require('express');
var router = express.Router();
var passport = require('passport');

var usersController = require('../controllers/usersController');
var songsController     = require('../controllers/songsController');
// var clientsController   = require('../controllers/clientsController');
var contestsController  = require('../controllers/contestsController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

// User Routes
router.route('/users')
  .get(usersController.usersIndex)
  .post(usersController.usersCreate)

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .delete(usersController.usersDelete)

// Song Routes
router.route('/songs')
  .get(songsController.songsIndex)
  .post(songsController.songsCreate)

router.route('/songs/:id')
  .get(songsController.songsShow)
  .put(songsController.songsUpdate)
  .delete(songsController.songsDelete)

/*Client Routes
router.route('/clients')
  .get(clientsController.clientsIndex)
  .post(clientsController.clientsCreate)

router.route('/clients/:id')
  .get(clientsController.clientsShow)
  .put(clientsController.clientsUpdate)
  .delete(clientsController.clientsDelete)*/

// Contest Routes
router.route('/contests')
  .get(contestsController.contestsIndex)
  .post(contestsController.contestsCreate)

router.route('/contests/:id')
  .get(contestsController.contestsShow)
  .put(contestsController.contestsUpdate)
  .delete(contestsController.contestsDelete)

module.exports = router;