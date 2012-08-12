
/*
 * GET home page.
 */
var db = require('./../models/db');


exports.index = function(req, res){
  res.render('index', { title: 'Artisense - Buy, Sell and Enjoy Art from Around The World', scripts: []});
};

exports.showSignup = function(req, res) {
	res.render('signup', {title: 'Signup - Artisense', errors: [], scripts: ['javascripts/signup.js'] });
};

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
		biography: req.body.txtBiography 
	});

	user.save(function(err, user) {
		var errors = [];
		if (err) {
			errors.push(err);
            res.render('signup', { title: "Signup Error", errors: errors, scripts: ['javascripts/signup.js'] });
		} else {
            res.render('userpage', {title: 'Signup Successful', errors: errors,
                userName: user.username,
                firstName: user.name.first,
                lastName: user.name.last,
                biography: user.biography,
                scripts: ['javascripts/signup.js'] });

        }
	});
	
};

exports.login = function(req, res) {
    
  res.render('login', {title: 'Login', errors: []});  
};

exports.buyer = function(req, res) {
    res.render('buyer', {title: 'Buy Art', errors: [], scripts: ['javascripts/buyer.js']});
};

exports.about = function(req, res) {
  res.render('about', {title: 'About Us', errors: [], scripts: []});  
};

exports.contact = function(req, res) {
  res.render('contact', {title: 'About Us', errors: [], scripts: []});  
};

exports.userPage = function(req, res) {
    
    var reqUserName = req.body.txtUserName;
    var reqPassword = req.body.txtPassword;

    db.models.User.findOne({username: reqUserName,
			   password: reqPassword}, function(err, user){ 
					   
					   if(err) {
					       console.log(err);
					       res.send(500, "error");					       
					       return;
					   }

					   if(user) {
					       res.render('userpage', {title: 'Profile - Artisense', errors: [],
								      userName: user.username,
								      firstName: user.name.first,
								      lastName: user.name.last,
								      biography: user.biography});
					   } else {
					       res.render('login', {title: 'Login - Artisense', errors: ['Username/Password invalid']});
					   }
				});
};