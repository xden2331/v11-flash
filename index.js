// === Libraries ===
const express 		=require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
const mongoose 		= require("mongoose");
const passport		= require("passport");
const LocalStrategy	= require("passport-local");
const methodOverride = require('method-override');
const flash = require('connect-flash');
// === END of Libraries===

// === JS ===
var Campground = require("./models/campground");
var Comment = require("./models/comment");
const User			= require("./models/user");
var seedDB = require('./seeds');
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/auth");
// === END of JS ===

mongoose.connect("mongodb+srv://xden2331:XDen2331@cluster0-z17gi.mongodb.net/yelp_camp_v11?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(()=>{
	console.log("Connected to DB!");
}).catch(err => {
	console.log("Err:", err.message);
});
// seedDB();

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Red Velvet",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
passport.use(User.createStrategy());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use(authRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/campgrounds', campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, () => {
	console.log('The YelpComp Server Has Started!');
});
