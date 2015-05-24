var express = require('express');
var router = express.Router();
function isAuthenticated (req, res, next) {
        // if user is authenticated in the session, call the next() to call the next request handler
        // Passport adds this method to request object. A middleware is allowed to add properties to
        // request and response objects
        //allow all get request methods
        if(req.method === ""){
                return next();
        }
//      if (req.isAuthenticated()){
//              return next();
//        if (!req.isAuthenticated()){
//        return res.redirect('/login');
//        }
        // if the user is not authenticated then redirect him to the login page
                return next();
};
router.use('/:name', isAuthenticated);
router.route('/:name')
.get(function(req, res){
  var name = req.params.name;
  res.render('partials/' + name);
});
module.exports = router;
