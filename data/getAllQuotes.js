var mongoose = require('mongoose');
var assert = require('assert');

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

  /*
   * for the modular pattern:
   * model.js: module.exports = mongoose.model('Quote', quoteSchema);
   * api.js:   var Quote = require('./model.js');
   * i.e. `require` executes whatever is exported
  */
  var Quote = mongoose.model('Quote', quoteSchema);
  // assert.equal(null, Quote, 'Quote model exists');

  Quote.find(function(err, quotes) {
    if (err) return console.error(err);
    // assert.equal(null, quotes, 'quote exists');
    console.log(quotes);
  });


