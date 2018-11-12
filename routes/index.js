var express 	= require('express');
var router  	= express.Router();
var passport	= require('passport');
var User		= require('../models/user');


router.get("/", function(req,res){
	res.render("landing");
});

// Authentication Routes

//  Show register form

router.get("/register", function(req, res){
	res.render("register");
});

// Register a new user

router.post("/register", function(req, res){
	var newUser = new User({username : req.body.username, nickname : req.body.nickname});
	if(req.body.password === req.body.confirm) {
          User.register(newUser, req.body.password, function(err, user){
				if(err) {
					req.flash("error", err.message);
					return res.render("register");
				} 
				passport.authenticate("local")(req, res, function(){
					req.flash("success", "Welcome to YelpCamp " + user.nickname);
					res.redirect("/campgrounds");
				});
			});
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
	
});

// Show login form

router.get("/login", function(req, res){
	res.render("login");
});

// Handle login logic

router.post("/login", passport.authenticate("local",
	 {
	 	successRedirect : "/campgrounds",
	 	failureRedirect : "/login",
	 	failureFlash : true 

	}), function(req, res){
	
});

// Logout

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully Logged out!");
	res.redirect("/campgrounds");
});

module.exports = router;