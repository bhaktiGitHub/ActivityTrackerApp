var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/AboutUs', function(req, res){
	res.render('aboutus');
});


module.exports = router;