var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.get('/about',function(req,res){
  res.render('aboutus');
});

router.get('/addactivity',ensureAuthenticated, function(req,res){
	console.log(req.user);
	
		res.render('addactivity',{user:req.user});

  
});
router.get('/info',ensureAuthenticated, function(req,res){
	
	
		res.render('profile',{user:req.user});

  
});
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;