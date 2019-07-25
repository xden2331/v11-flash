const express = require("express");
const passport = require("passport");

var router = express.Router();
var User = require("../models/user");

// === ROUTES ===
router.get('/', (req, res) => {
	res.render('landing');
});



// ==========
// AUTH ROUTES
// ==========

// show register form
router.get('/register', (req, res) => {
	res.render('register');
});

// handle sign up logic
router.post('/register', (req, res) => {
	User.register(
		new User({username: req.body.username}),
		req.body.password, (err, user) => {
			if(err){
				req.flash('error', err.message);
				return res.render('register');
			}
			passport.authenticate('local')(req, res, () => {
				req.flash('success', 'Welcome to YelCamp '+user.username);
				res.redirect('/campgrounds');
			});
		});
});

router.get('/login', (req, res) => {
	res.render('login');
});

// handle login logic
router.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}),(req, res) =>{

});

// logout
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'Logged you out!');
	res.redirect('/campgrounds');
});

module.exports = router;
