
/*
 * GET home page.
 */
var db = require('./../models/db');


exports.index = function(req, res){
  res.render('index', { title: 'Home', scripts: []});
};

exports.showSignup = function(req, res) {
	res.render('signup', {title: 'Signup', errors: [], scripts: ['javascripts/signup.js'] })
}

exports.processSignup = function(req, res) {
	var user = new db.models.User({
		username: req.body.txtFirstName + '_' + req.body.txtLastName,
		password: "password",
		name: {
			first: req.body.txtFirstName,
			last: req.body.txtLastName
		},
		email: req.body.txtEmail,
		phone: req.body.txtPhone,
		biography: req.body.biography 
	});

	user.save(function(err, user) {
		var errors = [];
		if (err) {
			errors.push(err);
		}

		res.render('signup', { title: 'Signup Successful', errors: errors, scripts: ['javascripts/signup.js'] });
	});	
};