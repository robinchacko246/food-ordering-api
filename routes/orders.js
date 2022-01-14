var express = require('express');
const passport = require('passport');
require( '../passport/passport');
const  passportLocalOAuth = passport.authenticate('local', { session : false });
const  passportJwtOAuth = passport.authenticate('jwt', { session : false });
let orderController=require('../controllers/orderController')
var router = express.Router();



router.post('/create-order',passportJwtOAuth,orderController.createOrder)
router.get('/:id',passportJwtOAuth,orderController.getOrder)

module.exports = router;
