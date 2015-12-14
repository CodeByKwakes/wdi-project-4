var express = require('express');
var router = express.Router();

var producersController = require('../controllers/producersController');
var songsController = require('../controllers/songsController');

// Producer Routes

/*router.route('/')
  .get(producersController.producersIndex)*/

router.route('/producers')
  .get(producersController.producersIndex)
  .post(producersController.producersCreate)

router.route('/producers/:id')
  .get(producersController.producersShow)
  .put(producersController.producersUpdate)
  .delete(producersController.producersDelete)

// Song Routes

// router.route('/songs')
//   .get(songsController.songsIndex)
//   .post(songsController.songsCreate)

// router.route('/songs/:id')
//   .get(songsController.songsShow)
//   .patch(songsController.songsUpdate)
//   .delete(songsController.songsDelete)

module.exports = router;











