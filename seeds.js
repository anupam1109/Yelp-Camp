var mongoose 			= require('mongoose'),
	Campground 			= require('./models/campground'),
	Comment 			= require('./models/comment')

var data = [
	{
		name : "Salmon Creek",
		image : "https://farm2.staticflickr.com/1835/28143945377_979496bb1a.jpg",
		description : "Nice trees"
	},
	{
		name : "Lake Placid",
		image : "https://farm4.staticflickr.com/3492/3803257600_00cf1e129d.jpg",
		description : "Nice lake"
	},
	{
		name : "Sea Park",
		image : "https://farm4.staticflickr.com/3197/3062217024_7958f241e5.jpg",
		description : "Nice view"
	},
	{
		name : "Salmon Creek",
		image : "https://farm2.staticflickr.com/1835/28143945377_979496bb1a.jpg",
		description : "Nice trees"
	},
	{
		name : "Lake Placid",
		image : "https://farm4.staticflickr.com/3492/3803257600_00cf1e129d.jpg",
		description : "Nice lake"
	},
	{
		name : "Sea Park",
		image : "https://farm4.staticflickr.com/3197/3062217024_7958f241e5.jpg",
		description : "Nice view"
	}		
];

function seedDB(){
	// Remove all campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed Campgrounds");

			// add a few campgrounds

			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err) {
						console.log("Error");
					} else {
						console.log("added a camground");

						// create a comment

						Comment.create(
							{
								text : "blah blah blah",
								author : "Anonymous"
							},function(err,comment){
								if(err) {
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
									console.log("Created a new comment");
								}
							});
					}
				});
			});
		}
	});
}

module.exports = seedDB;