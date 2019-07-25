module.exports={
	createCampgrounds: function (isNeeded, model){
	if(isNeeded){
		model.create(
		{
			name: "Jonathan Forage",
			image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60",
			description: "This is an image photoed by Jonathan Forage, uploaded onto unsplash.com"
		}, (err, res)=>{
			if(err){
				console.log(err);
			}else{
				console.log("NEWLY CREATED CAMPGROUND: ");
				console.log(res);
			}
		});
		model.create(
		{
			name: "Teddy Kelley",
			image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60",
			description: "This is an image photoed by Teddy Kelley, uploaded onto unsplash.com"
		}, (err, res)=>{
			if(err){
				console.log(err);
			}else{
				console.log("NEWLY CREATED CAMPGROUND: ");
				console.log(res);
			}
		});
		model.create(
		{
			name: "Mike Erskine",
			image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60",
			description: "This is an image photoed by Mike Erskine, uploaded onto unsplash.com"
		}, (err, res)=>{
			if(err){
				console.log(err);
			}else{
				console.log("NEWLY CREATED CAMPGROUND: ");
				console.log(res);
			}
		});
	}
}
};

