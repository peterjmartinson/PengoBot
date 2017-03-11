/*
 * Initialize a quotes database
 *
 * Inserts the first five quotes from
 * The Pragmatic Programmer
 * into a local MongoDB database
 *
 * Intended for testing purposes.
 *
 * Author: Peter Martinson
 * Date:   March 10, 2017
*/
var mongoose = require('mongoose');
var assert   = require('assert');  // node's native unit tester

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/pragmaticquotes');

var quoteSchema = mongoose.Schema({
  quote_id:       Number,
  source:         String,
  source_href:    String,
  quote:          String,
  quote_href:     String,
  subquote:       String,
  subquote_href:  String
});

var Quote = mongoose.model('Quote', quoteSchema);

var q1 = new Quote({
  quote_id: 1,
  source: "The Pragmatic Programmer",
  quote: "Care About Your Craft",
  subquote: "Why spend your life developing software unless you care about doing it well?"
});

var q2 = new Quote({
  quote_id: 2,
  source: "The Pragmatic Programmer",
  quote: "Provide Options, Don't Make Lame Excuses",
  subquote: "Instead of excuses, provide options. Don't say it can't be done; explain what can be done."
});

var q3 = new Quote({
  quote_id: 3,
  source: "The Pragmatic Programmer",
  quote: "Be a Catalyst for Change",
  subquote: "You can't force change on people. Instead, show them how the future might be and help them participate in creating it."
});

var q4 = new Quote({
  quote_id: 4,
  source: "The Pragmatic Programmer",
  quote: "Make Quality a Requirements Issue",
  subquote: "Involve your users in determining the project's real quality requirements."
});

var q5 = new Quote({
  quote_id: 5,
  source: "The Pragmatic Programmer",
  quote: "Critically Analyze What You Read and Hear",
  subquote: "Don't be swayed by vendors, media hype, or dogma. Analyze information in terms of you and your project."
});

var quoteArr = [q1, q2, q3, q4, q5];

quoteArr.forEach(function(element) {
  element.save(function(err, quote) {
    assert.equal(null, err, 'no errors');
    console.log("inserted: " + quote.quote);
  })
});






