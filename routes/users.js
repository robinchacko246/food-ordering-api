var express = require('express');
const passport = require('passport');
require( '../passport/passport');
const  passportLocalOAuth = passport.authenticate('local', { session : false });
const  passportJwtOAuth = passport.authenticate('jwt', { session : false });
let userController=require('../controllers/userController')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api end point');
});

router.post('/signup',userController.SignUp );
router.post('/signin',passportLocalOAuth,userController.signIn );
router.post('/update',passportJwtOAuth,userController.update );
router.get('/user-details/:user_id',passportJwtOAuth,userController.userDetails );

module.exports = router;
