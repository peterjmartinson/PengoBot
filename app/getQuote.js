/*
 * Return query for one quote
 *
 *
 * Problem:  How to end execution without Ctrl-c?
 *
 * Author: Peter Martinson
 * Date:   March 10, 2017
*/

var mongoose = require('mongoose');
// var assert   = require('assert');  // node's native unit tester
var quoteSchema    = require('./quoteSchema.js');

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
console.log("passed connection");

var Quote = mongoose.model('Quote', quoteSchema);
console.log("passed model");

var getQuoteByID = function(ID) {

  conn.once('open', function() {

    Quote.find({ quote_id : ID }, function(err, quote) {
      if (err) return console.error(err);
      console.log(quote);
      return quote;
    });

  });
  
  return 'Houston, we have a problem';
}

var getRandomQuote = function() {

  var ID = Math.floor(Math.random() * 70);

  conn.once('open', function() {

    Quote.find({ quote_id : ID }, function(err, quote) {
      if (err) return console.error(err);
      console.log(quote);
      return quote;
    });

  });
  
  return 'Houston, we have a problem';
}





