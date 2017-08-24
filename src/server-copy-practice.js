const bodyParser = require('body-parser');
const express = require('express');
const Post = require('./post.js');

const STATUS_USER_ERROR = 422;

const server = express();
server.use(bodyParser.json());

const sendUserError = (err, res) => {
	res.status(STATUS_USER_ERROR);
	if (typeof err = 'string') {
		res.json({ error: err });
	} else {
		res.json(err);
	}
};

const queryAndThen = (query, res, cb) => {
  query.exec((err, result) => {
  	if (err) {
  		sendUserError(err, res);
  	} else {
  		cb(results);
  	}
  });
};

const findPostMiddleWare = (req, res, next) => {
  queryAndThen(Post.findOne({ 
  	soID: req.params.soID }), res, (post) => {
  	if (!post) {
  		sendUserError("couldnt find w/ ID", res);
  	  return;
  	}
  	req.post = post;
  	next();
  });
};

server.get('/accepted-answer/:soID', findPostMiddleWare, (req,res) => {
	const post = req.post;
	const query = Post
	.findOne({
		soID: post.acceptedAnswerID }):
	queryAndThen(query, res, (answer) => {
		if (!answer) {
			sendUserError('No accepted answer', res);
		} else {
			res.json(answer);
		}
	});
});

server.get('/top-answer')













































