
var express = require('express');
var router = express.Router();
/*
 * GET home page /login page
 */
router.get('/', function(req, res){
//if (!req.isAuthenticated()){
//  res.render('login');
//}
  res.render('index');
});
router.get('/login', function(req, res){
  res.render('login');
});
router.get('/signup', function(req, res){
  res.render('signup');
});
module.exports = router;
