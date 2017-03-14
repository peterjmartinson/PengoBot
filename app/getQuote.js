/*
 * Return query for one quote, either by passed ID or at random
 *
 *   getQuote.byID(id, function(err, res));
 *   getQuote.atRandom(function(err, res));
 *
 * Author: Peter Martinson
 * Date:   March 10, 2017
*/


var mongoose    = require('mongoose');
var quoteSchema = require('../models/quoteSchema.js');

var Quote = mongoose.model('Quote', quoteSchema);

module.exports = {

  byID:     function(id, callback) {
    Quote.find({ quote_id : id }, function(err, result) {
      if (err) { callback(err); }
      else     { callback(null, result); }
    });
  },

  atRandom: function(callback) {
    var id = Math.floor(Math.random() * 70);
    Quote.find({ quote_id : id }, function(err, result) {
      if (err) { callback(err); }
      else     { callback(null, result, id); }
    });
  }

}











// Below is for testing purposes

// var getQuoteByID = function(id, callback) {
//     Quote.find({ quote_id : id }, function(err, result) {
//       if (err) { callback(err); }
//       else { callback(null, result); }
//     });
// }

// var getRandomQuote = function(callback) {
//   var id = Math.floor(Math.random() * 70);
//     Quote.find({ quote_id : id }, function(err, result) {
//       if (err) { callback(err); }
//       else { callback(null, result, id); }
//     });
// }

// var test_id = 22;
// getQuoteByID(test_id, function(err, result) {
//   console.log("result from callback: " + result);
// });

// getRandomQuote(function(err, result, id) {
//   console.log("random quote #" + id + ": " + result);
// });



