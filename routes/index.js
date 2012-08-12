
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
		biography: req.body.txtBiography 
	});

	user.save(function(err, user) {
		var errors = [];
		if (err) {
			errors.push(err);
		}

		res.render('userpage', {title: 'Signup Successful', errors: errors,
				       userName: user.username,
					firstName: user.name.first,
					lastName: user.name.last,
					biography: user.biography,
					scripts: ['javascripts/signup.js'] });
	});
	
};

exports.login = function(req, res) {
    
  res.render('login', {title: 'Login', errors: []});  
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
					       res.render('userpage', {title: 'Title', errors: [],
								      userName: user.username,
								      firstName: user.name.first,
								      lastName: user.name.last,
								      biography: user.biography});
					       return;
					   } else {
					       res.render('login', {title: 'Title', errors: ['Username/Password invalid']});
					       return;
					   }
				});
};