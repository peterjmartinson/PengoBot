var mongoose = require('mongoose');
var assert = require('assert');

// mongoose.Promise = Promise;
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

  /*
   * for the modular pattern:
   * model.js: module.exports = mongoose.model('Quote', quoteSchema);
   * api.js:   var Quote = require('./model.js');
   * i.e. `require` executes whatever is exported
  */
  var Quote = mongoose.model('Quote', quoteSchema);
  // assert.equal(null, Quote, 'Quote model exists');

  // as a Callback query
  // does *not* work yet.
  // problem: it doesn't complete before the result is needed
  exports.getQuoteByID = function(ID) {
    Quote.find({ quote_id: ID }, 'quote subquote', function(err, quote) {
      if (err) return console.error(err);
      // assert.equal(null, quotes, 'quote exists');
      console.log(quote);
      // return quote;
    });
  }

  // as a Promise query
  var query = Quote.findOne({ quote_id: 2 });
  query.select('quote subquote');
  query.exec(function(err, result) {
    if (err) return console.error(err);
    // assert.notEqual(null, error, 'there is a problem: ' + error);
    console.log(result);
  });

