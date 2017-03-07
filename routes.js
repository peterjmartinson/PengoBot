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

var getRandomQuote = function () {
  app.get(function(req, res) {
    Quote.findById(req.params.quote_id, function(err, quote) {
      if (err) {
        res.send(err);
      }

      res.send(quote);
    });
  });
}

var getQuoteById = function() {}

var getRant = function() {}

var getHelp = function() {}
