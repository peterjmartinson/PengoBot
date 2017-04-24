/*
 * PengoBot
 * routes.js
 *
 * Define methods to query the database.
 *
 * Date:    March 7, 2017
 * Authors: Peter Martinson, etc.
*/

'use strict'
var express = require('express');
var app     = express();
var Quote   = require('./quotes.js');  // not sure this is correct

var numQuotes = 70;  // TEMPORARY!!  find number dynamically
var randomQuoteId = Math.round(numQuotes * Math.random());

app.get('get-random-quote', function(req, res) {
  // run the mongoose fetching function!
  // requester supplies a quote_id
  Quote.find({ quote_id : randomQuoteId }, function(err, quote) {
    if (err) {
      res.send(err);
    }
    // QUESTION: who parses result?  Me or Bot?
    // currently, Bot must parse it!
    res.send(quote);
  });
});

// var getQuoteById = function() {}

// var getRant = function() {}

// var getHelp = function() {}
