var Campground 		= require('../models/campground');
var Comment 		= require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	// is the user logged in
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found!");
				res.redrect("back");
			} else {
				// does user own the campground ?
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have the permission to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please Login To Proceed!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	// is the user logged in
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redrect("back");
			} else {
				// does user own the comment ?
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please login to proceed!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login To Proceed!");
	res.redirect("/login");
}

module.exports = middlewareObj;