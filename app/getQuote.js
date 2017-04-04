/*
 * Return query for one quote, either by passed ID or at random
 *
 *   getQuote.byID(id, function(err, res));
 *   getQuote.atRandom(function(err, res));
 *
 * Author: Peter Martinson
 * Date:   March 10, 2017
*/


const mongoose    = require('mongoose');
const quoteSchema = require('../models/quoteSchema.js');

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = {

  // byID:     function(id, callback) {
  //   Quote.find({ quote_id : id }, function(err, result) {
  //     if (err) callback(err);
  //     else     callback(null, result);
  //   });
  // },

  byID:     function(id, callback) {
    Quote.count({}, function(err, N) {
      if (err) callback(err);
      if ( id <= N ) {
        Quote.find({ quote_id : id }, function(err, result) {
          if (err) callback(err);
          else     callback(null, result);
        });
      }
      else {
        // return a BAD NUMBER flag
      }
    });
  },

  atRandom: function(callback) {
    Quote.count({}, function(err, N) {
      if (err) callback(err);
      var id = Math.floor(Math.random() * N);
      Quote.find({ quote_id : id }, function(err, result) {
        if (err) callback(err);
        else     callback(null, result, id);
      });
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



