var express = require('express');
var router = express.Router();
var queries = require('../db/queries/queries');

/** GET REQUESTS **/

// Back-end html (no current use-case for this route)
router.get('/', function(req, res, next) {
  res.render('index');
});

// Get a single pin by id
router.get('/getpin/:id', function(req, res, next) {
  queries.getPin(req.params.id)
    .then(function(pin) {
      res.json(pin);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

// Get all pins
router.get('/getpins', function(req, res, next) {
  queries.getPins()
    .then(function(pins) {
      res.json(pins);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

// Get a single user by id
router.get('/getuser/:id', function(req, res, next) {
  queries.getUser(req.params.id)
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

/** POST Requests **/

// Create a new pin
router.post('/newpin', function(req, res, next) {
  var newPin = req.body;

  //Set pin properties
  newPin.pin_image = '';
  newPin.active = true;
  newPin.missing = false;
  newPin.picked_up = false;
  newPin.dropper_id = req.user.user_id;
  newPin.receiver_id = null;

  queries.addPin(newPin)
    .then(function(id) {
      res.json(id);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

/** PUT RQUESTS **/

// Mark a pin as picked-up
router.post('/pickup', function(req, res, next) {

  var pickedupPin = req.body;
  var pin_id = pickedupPin.pin_id;

  //Set pin properties
  pickedupPin.active = true; //Stays active for a period of time so users can still see it on map
  pickedupPin.missing = false;
  pickedupPin.picked_up = true; //Changes pin color
  pickedupPin.receiver_id = req.user.user_id;

  queries.pickupPin(pin_id, pickedupPin)
    .then(function(id) {
      res.json(id);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

// Mark a pin as missing
router.post('/missing', function(req, res, next) {

  var pickedupPin = req.body;
  var pin_id = pickedupPin.pin_id;

  //Set pin properties
  pickedupPin.active = true; //Stays active for a period of time so users can still see it on map
  pickedupPin.missing = true;
  pickedupPin.picked_up = true; //Changes pin color
  pickedupPin.receiver_id = req.user.user_id;

  queries.pickupPin(pin_id, pickedupPin)
    .then(function(id) {
      res.json(id);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

module.exports = router;
