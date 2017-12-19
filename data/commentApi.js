"use strict";

var comments = require('./commentData').comments;
var _ = require('lodash');

var currentID = 3;
var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var CommentApi = {
	getAllComments: function(callback) {
		callback(null, _clone(comments));
	},
  getCommentById: function(id, callback) {
		var comment = _.find(comments, {id: parseInt(id)});
		callback (null, _clone(comment));
  },
  updateCommentById: function(id, comment, callback) {
			var existingCommentIndex = _.indexOf(comments, _.find(comments, {id: parseInt(id)}));
			comment.id = parseInt(id);
			comments.splice(existingCommentIndex, 1, comment);
			callback (null);
  },
	saveComment: function(comment, callback) {
		currentID = currentID + 1;
    comment.id = currentID;
    comments.push(comment);
		callback(null, _clone(comment));
	},
	deleteCommentById: function(id, callback) {
		_.remove(comments, { id: parseInt(id)});
    callback(null);
	}
};

module.exports = CommentApi;
