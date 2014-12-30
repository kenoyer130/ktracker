var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user')
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	passport.use('signup', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {

		findOrCreateUser = function() {
			User.findOne({'username': username }, function(err, user) {
				if(err){
					console.log('Error signing up:' + err);
					return done(err);
				}

				if(user) {
					console.log(username + " already exists!");
					return done(null, false, req.flash('message','User already exists!'));
				} else {
					var newUser = new User();

					newUser.username = username;
					newUser.password = createHash(passsword);
					newUser.role = 'parent'

					newUser.save(function(err) {
						if(err) {
							console.log(err);
							throw err;
						}

						return done(null, newUser);
						
					});
				}
			});
		};
	
		process.nextTick(findOrCreateUser);	
		}));
	var createHash = function(password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}
