/*
 * Return query for one quote, either by passed ID or at random
 *
 *   getQuote.byID(id, function(err, res));
 *   getQuote.atRandom(function(err, res));
 *
 * © 2017 Team Pengo
 *
 * Authors: Khyati Kulshreshtha,
 *          Monyette Tanzillo,
 *          Claudio Gentile,
 *          Peter Martinson 
*/


const mongoose    = require('mongoose'),
      quoteSchema = require('../models/quoteSchema.js'),
      Quote       = mongoose.model('Quote', quoteSchema);

module.exports = {

  byID: function(id, callback) {
    Quote.count({}, function(err, N) {
      if (err) callback(err);
      if ( id > 0 && id <= N ) {

        Quote.find({ quote_id : id }, function(err, result) {
          if (err) callback(err);
          else     callback(null, result);
        });

      }
      else {
        // User entered an out-of-range ID
        callback(null,{ bad_number:1, N:N});
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



