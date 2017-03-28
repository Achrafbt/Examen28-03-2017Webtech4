module.exports = function(app) {

	var mongoose = require('mongoose');
	var Quote      = require('./models/Quote');
	var db       = require('../config/db');

 // Get one quote
 app.get('/quotes/:quote_id', function(req, res) {
				if(mongoose.connection.readyState != 1) {
						mongoose.connect(db.url);
				}
				mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
				Quote.find({_id: req.params.quote_id}, function(err, quotes) {
							if (err) {
									throw err;
							}
							// Find returns an array of collection
							return res.render('quote', {quote: quotes[0]});
				});
	});

	// Get all quotes
	app.get('/index', function(req, res) {
				 if(mongoose.connection.readyState != 1) {
							mongoose.connect(db.url);
					}
				 mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
					Quote.find({}, function(err, quotes) {
								if (err) {
											throw err;
								}
								return res.render('index', {quotes: quotes});
					});
	});

	// Get save form for new quote
	app.get('/add', function(req, res) {
					res.render('add');
	});

 // Save new quote
	app.post('/add', function(req, res) {
		  if(mongoose.connection.readyState != 1) {
				  mongoose.connect(db.url);
		  }
				var quote = new Quote({author: req.body.author, quote: req.body.quote});
				quote.save(function (err, c) {
					  if (err) {
										throw err;
							}
					  return res.redirect('/index');
				});
	});
};
