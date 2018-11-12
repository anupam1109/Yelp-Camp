var express 		= require('express');
var router  		= express.Router(); 
var Campground 		= require('../models/campground');
var middleware		= require('../middleware')

// Show all campgrounds
router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err)
		} else {
			res.render("campgrounds/index", {campgrounds : allCampgrounds});
		}
	});
});

// Create - add a new campground to Database
router.post("/", middleware.isLoggedIn ,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id : req.user._id,
		username : req.user.username
	}
	var newCampground = {name: name, image: image, description : description, author : author};

	Campground.create(newCampground, function(err,newlyCreatedCampground){
		if(err){
			console(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// New show form to create new campground
router.get("/new", middleware.isLoggedIn ,function(req,res){
	res.render("campgrounds/new");
});

// Show campground
router.get("/:id", function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err) {
			console.log(err);
		} else {
			// console.log(foundCampground);
			res.render("campgrounds/show", {campground : foundCampground});
		}
	});
});

// Edit Campground

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground : foundCampground});
	});
});

// Update Campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Destroy campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground deleted!");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;