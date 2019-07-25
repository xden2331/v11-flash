const express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require('../middleware');
var isLoggedIn = middleware.isLoggedIn;
var checkCommentOwnership = middleware.checkCommentOwnership;

// ======================
// COMMENTS ROUTES
// ======================
router.get('/new', isLoggedIn, (req, res) => {
	// find campground by id
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		}else{
			res.render('comments/new', {campground:campground});
		}
	})
});

router.post('/', isLoggedIn, (req, res) => {
	// look up campground using id
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			// add username and id to comment
			// save comment
			// create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash('success', 'Created a comment!');
					res.redirect(`/campgrounds/${campground._id}`);
				}
			});
		}
	});
});

// COMMENT EDIT ROUTE
router.get('/:comment_id/edit', checkCommentOwnership, async (req, res) => {
	try {
		var comment = await Comment.findById(req.params.comment_id);
		res.render('comments/edit', {campground_id : req.params.id, comment: comment});
	} catch (e) {
		console.log(e);
	}
});

// COMMENT update
router.put('/:comment_id', checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if(err) {
			res.redirect('back');
		}else{
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

// COMMENT DESTORY ROUTE
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
	// find by id and remove
	Comment.findByIdAndRemove(req.params.comment_id, (err)=> {
		if(err){
			res.redirect('back');
		}else{
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

module.exports = router;
