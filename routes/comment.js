var CommentApi = require('../data/CommentApi');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  CommentApi.getAllComments(function(err, items) {
    res.render('comment/index', {title: 'Comments', comments: items})
	});
});

router.get('/create', function(req, res) {
	res.render('comment/create');
});

router.post('/create', function(req, res) {
  var comment = {};
  comment.author = req.body.author;
  comment.text = req.body.text;

  CommentApi.saveComment(comment, function(err, comment) {
	  res.redirect('/comment');
  });
});

router.get('/edit/:id', function(req, res) {
  CommentApi.getCommentById(req.params.id, function(err, comment) {
    res.render('comment/edit', {comment: comment});
  });

});

router.post('/edit/:id', function(req, res) {
  var updatedComment = {};
  updatedComment.author = req.body.author;
  updatedComment.text = req.body.text;
  CommentApi.updateCommentById(req.params.id, updatedComment, function(err) {
			res.redirect('/comment');
  });
});

router.get('/delete/:id', function(req, res) {
  CommentApi.deleteCommentById(req.params.id, function(err) {
    res.redirect('/comment');
  });
});

module.exports = router;
