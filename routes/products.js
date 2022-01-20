var express = require('express');
const passport = require('passport');
require( '../passport/passport');
const  passportLocalOAuth = passport.authenticate('local', { session : false });
const  passportJwtOAuth = passport.authenticate('jwt', { session : false });
let productController=require('../controllers/productController')
var router = express.Router();



router.get('/get-products',productController.Products );
router.get('/:id',passportJwtOAuth,productController.getProduct)

module.exports = router;
