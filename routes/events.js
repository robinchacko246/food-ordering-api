var express = require('express');
const passport = require('passport');
require( '../passport/passport');
const  passportLocalOAuth = passport.authenticate('local', { session : false });
const  passportJwtOAuth = passport.authenticate('jwt', { session : false });
let productController=require('../controllers/eventController')
var router = express.Router();



router.get('/get-events',productController.Events );
router.get('/:id',productController.getProduct)

module.exports = router;
